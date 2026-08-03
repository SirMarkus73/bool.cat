import { createFormHook, createFormHookContexts } from "@tanstack/react-form";
import { FormRootError } from "#/components/appForm/formRootError";
import { InputField } from "#/components/appForm/inputField";
import { SubmitButton } from "#/components/appForm/submitButton";

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
