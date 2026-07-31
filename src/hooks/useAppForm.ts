import { createFormHook, createFormHookContexts } from "@tanstack/react-form";
import { InputField } from "#/components/appForm/inputField";
import { SubmitButton } from "#/components/appForm/submitButton";

// export useFieldContext for use in your custom components
const { fieldContext, formContext, useFieldContext, useFormContext } =
	createFormHookContexts();

const { useAppForm } = createFormHook({
	fieldContext,
	formContext,
	fieldComponents: {
		InputField,
	},
	formComponents: {
		SubmitButton,
	},
});

export { useFieldContext, useFormContext, useAppForm };
