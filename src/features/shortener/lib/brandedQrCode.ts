import QRCode from "qrcode";
import AppIcon from "#/assets/logo/boolcat-app-icon-blue.svg";

// Brand primary (same fill as the logo); ~5.4:1 on white, safe for scanners
const QR_DOT_COLOR = "#007595";
// Deeper shade of the brand blue so the three finder "eyes" anchor the code
const QR_EYE_COLOR = "#00566e";
const QR_BACKGROUND_COLOR = "#ffffff";
// Rendered at high resolution so the copied image stays crisp
const QR_SIZE = 640;
const QR_MARGIN = 1;
const DOT_RADIUS = 0.43;
const FINDER_SIZE = 7;
// Error correction "H" recovers up to ~30% of the code, so the cleared
// area behind the logo is kept well below that
const LOGO_RATIO = 0.22;
const LOGO_PADDING = 1;

function roundedRectPath(x: number, y: number, size: number, radius: number) {
	const r = Math.min(radius, size / 2);
	const side = size - r * 2;
	return (
		`M${x + r} ${y}h${side}a${r} ${r} 0 0 1 ${r} ${r}v${side}` +
		`a${r} ${r} 0 0 1 ${-r} ${r}h${-side}a${r} ${r} 0 0 1 ${-r} ${-r}` +
		`v${-side}a${r} ${r} 0 0 1 ${r} ${-r}Z`
	);
}

function circlePath(cx: number, cy: number, r: number) {
	return `M${cx - r} ${cy}a${r} ${r} 0 1 0 ${r * 2} 0a${r} ${r} 0 1 0 ${-r * 2} 0Z`;
}

/**
 * Builds the QR as SVG path data in module units: round dots for data,
 * rounded finder "eyes", and a grid-aligned hole in the center for the logo.
 */
export function buildQrPaths(text: string) {
	const { modules } = QRCode.create(text, { errorCorrectionLevel: "H" });
	const { size } = modules;
	const total = size + QR_MARGIN * 2;

	const finderOrigins = [
		[0, 0],
		[size - FINDER_SIZE, 0],
		[0, size - FINDER_SIZE],
	];
	const isInFinder = (row: number, col: number) =>
		finderOrigins.some(
			([x, y]) =>
				col >= x && col < x + FINDER_SIZE && row >= y && row < y + FINDER_SIZE,
		);

	// Clear whole modules around the logo so no dot is cut in half
	const center = (size - 1) / 2;
	const logoHalf = Math.ceil((total * LOGO_RATIO) / 2 + LOGO_PADDING);
	const isInLogoArea = (row: number, col: number) =>
		Math.abs(row - center) <= logoHalf && Math.abs(col - center) <= logoHalf;

	let dots = "";
	for (let row = 0; row < size; row++) {
		for (let col = 0; col < size; col++) {
			if (!modules.get(row, col)) continue;
			if (isInFinder(row, col) || isInLogoArea(row, col)) continue;
			dots += circlePath(
				col + QR_MARGIN + 0.5,
				row + QR_MARGIN + 0.5,
				DOT_RADIUS,
			);
		}
	}

	let eyes = "";
	for (const [x, y] of finderOrigins) {
		const ox = x + QR_MARGIN;
		const oy = y + QR_MARGIN;
		// Outer ring (drawn with evenodd) + inner pupil
		eyes += roundedRectPath(ox, oy, 7, 2.2);
		eyes += roundedRectPath(ox + 1, oy + 1, 5, 1.3);
		eyes += roundedRectPath(ox + 2, oy + 2, 3, 1);
	}

	return { total, dots, eyes, logoSize: total * LOGO_RATIO };
}

function loadImage(src: string) {
	return new Promise<HTMLImageElement>((resolve, reject) => {
		const image = new Image();
		image.onload = () => resolve(image);
		image.onerror = reject;
		image.src = src;
	});
}

/** Generates a PNG data URL of `text` as a brand-styled QR with the app icon in the center. */
export async function createBrandedQrCode(text: string) {
	const { total, dots, eyes, logoSize } = buildQrPaths(text);

	const canvas = document.createElement("canvas");
	canvas.width = QR_SIZE;
	canvas.height = QR_SIZE;
	const ctx = canvas.getContext("2d");
	if (!ctx) throw new Error("Canvas 2D context is not available");

	ctx.fillStyle = QR_BACKGROUND_COLOR;
	ctx.fillRect(0, 0, QR_SIZE, QR_SIZE);

	ctx.save();
	ctx.scale(QR_SIZE / total, QR_SIZE / total);
	ctx.fillStyle = QR_DOT_COLOR;
	ctx.fill(new Path2D(dots));
	ctx.fillStyle = QR_EYE_COLOR;
	ctx.fill(new Path2D(eyes), "evenodd");
	ctx.restore();

	const logo = await loadImage(AppIcon);
	const logoPx = (logoSize / total) * QR_SIZE;
	const logoOffset = (QR_SIZE - logoPx) / 2;
	ctx.drawImage(logo, logoOffset, logoOffset, logoPx, logoPx);

	return canvas.toDataURL("image/png");
}
