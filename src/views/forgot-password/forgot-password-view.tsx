"use client"

import type { ForgotPassword } from "src/types/forms/forgot-password"

import { defaultValuesForgotPassword as defaultValues, ForgotPasswordSchema } from "src/types/forms/forgot-password"

import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { useTranslation } from "react-i18next"

import { zodResolver } from "@hookform/resolvers/zod"

import LockIcon from "@mui/icons-material/Lock"

import { Container } from "@mui/material"

import handleServerResponse from "src/utils/helper-functions/handleServerResponse"

import forgotPassword from "src/actions/auth/forgot-password"

import FlexCenteredFullScreenContainer from "src/components/base/flex-box/flex-center-full-screen-container"
import Form from "src/components/react-hook-form/form-provider"
import FormHead from "src/components/react-hook-form/form/form-head"
import FormReturnLink from "src/components/react-hook-form/form/form-return-link"
import FormSubmitButton from "src/components/react-hook-form/form/form-submit-button"
import AuthFormInput from "src/components/react-hook-form/rhf-filled-input-custom"

import routes from "src/routes/routes"

export default function ForgotPasswordView() {
    const { t } = useTranslation()

    const methods = useForm<ForgotPassword>({ defaultValues, resolver: zodResolver(ForgotPasswordSchema) })
    const { handleSubmit } = methods

    const onSubmit = handleSubmit(async (formData) => {
        const response = await forgotPassword(formData.email)
        await handleServerResponse({ redirectTo: routes.auth.login, response, toast })
    })

    return (
        <FlexCenteredFullScreenContainer minHeight="75dvh">
            <Container maxWidth="sm">
                <Form methods={methods} onSubmit={onSubmit}>
                    <FormHead
                        description={t(`Enter The Email Address Associated With Your Account`)}
                        icon={<LockIcon sx={{ color: "primary.main", fontSize: 80 }} />}
                        title={t("Forgot Your Password?")}
                    />
                    <AuthFormInput inputName="email" label={t("Email Address")} />
                    <FormSubmitButton loadingTitle={t("Sending Email...")} title={t("Send Email")} />
                </Form>
                <FormReturnLink href={routes.auth.login} title={t("Return To Sign In")} />
            </Container>
        </FlexCenteredFullScreenContainer>
    )
}
