import { createFormHook, createFormHookContexts } from "@tanstack/react-form";
import { FormRootError } from "#/features/appForm/components/formRootError";
import { InputField } from "#/features/appForm/components/inputField";
import { SubmitButton } from "#/features/appForm/components/submitButton";

// export useFieldContext for use in your custom components
const { fieldContext, formContext, useFieldContext, useFormContext } =
	createFormHookContexts();

const { useAppForm, withForm } = createFormHook({
	fieldContext,
	formContext,
	fieldComponents: {
		InputField,
	},
	formComponents: {
		SubmitButton,
		FormRootError,
	},
});

export { useFieldContext, useFormContext, useAppForm, withForm };
