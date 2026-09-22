import { createFormHook, createFormHookContexts } from "@tanstack/react-form";
import { InputField } from "#/features/appForm/components/fields/inputField";
import { SlugField } from "#/features/appForm/components/fields/slugField";
import { FormRootError } from "#/features/appForm/components/form/formRootError";
import { SubmitButton } from "#/features/appForm/components/form/submitButton";

// export useFieldContext for use in your custom components
const { fieldContext, formContext, useFieldContext, useFormContext } =
	createFormHookContexts();

const { useAppForm, withForm } = createFormHook({
	fieldContext,
	formContext,
	fieldComponents: {
		InputField,
		SlugField,
	},
	formComponents: {
		SubmitButton,
		FormRootError,
	},
});

export { useFieldContext, useFormContext, useAppForm, withForm };
