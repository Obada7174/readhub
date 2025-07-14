"use client";

import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

import Input from "@/components/dashboard/Input";
import DashContainer from "@/components/dashboard/DashContainer";
import DashHeader from "@/components/dashboard/Header";
import DashButton from "@/components/ui/Button";
import { AddPageFormValues, UpdatePagePayload } from "@/types/static-page";

import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor";

interface PageFormProps {
    mode: "add" | "edit";
    defaultValues?: Partial<AddPageFormValues | UpdatePagePayload>;
    onSubmit: (data: AddPageFormValues | UpdatePagePayload) => Promise<void>;
}

export default function PageForm({
    mode,
    defaultValues,
    onSubmit,
}: PageFormProps) {
    const t = useTranslations("Dashboard.static-pages");
    const router = useRouter();

    const {
        control,
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<AddPageFormValues | UpdatePagePayload>({
        defaultValues: defaultValues ?? {
            en_title: "",
            en_content: "",
            ar_title: "",
            ar_content: "",
            url: "",
            is_published: false,
        },
    });

    const submitHandler: SubmitHandler<
        AddPageFormValues | UpdatePagePayload
    > = async (data) => {
        const validationErrors: Partial<Record<keyof AddPageFormValues, string>> = {};

        if (!data.en_title || data.en_title.trim().length < 2) {
            validationErrors.en_title = t("errors.en_title_required");
        }

        if (!data.en_content || data.en_content.trim().length < 10) {
            validationErrors.en_content = t("errors.en_content_required");
        }

        if (!data.ar_title || data.ar_title.trim().length < 2) {
            validationErrors.ar_title = t("errors.ar_title_required");
        }

        if (!data.ar_content || data.ar_content.trim().length < 10) {
            validationErrors.ar_content = t("errors.ar_content_required");
        }

        if (!data.url || !/^\/[\w\-/.]+$/.test(data.url)) {
            validationErrors.url = t("errors.url_invalid");
        }

        if (typeof data.is_published !== "boolean") {
            validationErrors.is_published = t("errors.is_published_required");
        }

        if (Object.keys(validationErrors).length > 0) {
            Object.entries(validationErrors).forEach(([field, message]) => {
                setError(field as keyof AddPageFormValues, {
                    type: "manual",
                    message,
                });
            });
            return;
        }

        try {
            await onSubmit(data);
            router.push("/dashboard/pages");
        } catch (err) {
            console.error("Error submitting page form", err);
        }
    };

    return (
        <DashContainer>
            <DashHeader title={mode === "add" ? t("add_page") : t("edit_page")} />

            <form
                onSubmit={handleSubmit(submitHandler)}
                className="space-y-6 mx-auto"
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* English Title */}
                    <Input
                        label={t("en_title")}
                        placeholder={t("en_title_placeholder")}
                        {...register("en_title")}
                        error={errors.en_title?.message}
                    />

                    {/* Arabic Title */}
                    <Input
                        label={t("ar_title")}
                        placeholder={t("ar_title_placeholder")}
                        {...register("ar_title")}
                        error={errors.ar_title?.message}
                    />
                </div>


                <Controller
                    name="en_content"
                    control={control}
                    render={({ field }) => (
                        <SimpleEditor
                            content={field.value || ""}
                            onChange={field.onChange}
                        />
                    )}
                />
                {errors.en_content && (
                    <p className="text-red-500 text-sm">{errors.en_content.message}</p>
                )}

                {/* Arabic Content */}
                <Controller
                    name="ar_content"
                    control={control}
                    render={({ field }) => (
                        <SimpleEditor
                            content={field.value || ""}
                            onChange={field.onChange}
                        />
                    )}
                />
                {errors.ar_content && (
                    <p className="text-red-500 text-sm">{errors.ar_content.message}</p>
                )}

                {/* URL */}
                <Input
                    label={t("url")}
                    placeholder="/about-us"
                    {...register("url")}
                    error={errors.url?.message}
                    className="max-w-lg"
                />

                {/* Published Switch */}
                <Controller
                    name="is_published"
                    control={control}
                    render={({ field }) => (
                        <FormControlLabel
                            control={
                                <Switch
                                    {...field}
                                    checked={field.value}
                                    onChange={(e) => field.onChange(e.target.checked)}
                                    color="primary"
                                />
                            }
                            label={t("is_published")}
                        />
                    )}
                />
                {errors.is_published && (
                    <p className="text-red-500 text-sm">{errors.is_published.message}</p>
                )}

                <DashButton
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md"
                >
                    {isSubmitting
                        ? t("submitting")
                        : mode === "add"
                            ? t("add_page")
                            : t("save_changes")}
                </DashButton>
            </form>
        </DashContainer>
    );
}