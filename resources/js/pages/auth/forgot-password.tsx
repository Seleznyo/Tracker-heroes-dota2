import { Form, Head } from '@inertiajs/react';
import { Mail } from 'lucide-react';
import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import {
    authButtonClass,
    authInputClass,
    authLabelClass,
    authTextLinkClass,
} from '@/lib/auth-styles';
import { login } from '@/routes';
import { email } from '@/routes/password';

export default function ForgotPassword({ status }: { status?: string }) {
    return (
        <>
            <Head title="Восстановление пароля" />

            {status && (
                <div className="mb-5 rounded-xl border border-emerald-500/25 bg-emerald-500/10 px-4 py-3 text-sm font-medium text-emerald-400">
                    {status}
                </div>
            )}

            <Form {...email.form()} className="space-y-5">
                {({ processing, errors }) => (
                    <>
                        <div className="space-y-2">
                            <Label htmlFor="email" className={authLabelClass}>
                                Email
                            </Label>
                            <Input
                                id="email"
                                type="email"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                placeholder="you@example.com"
                                className={authInputClass}
                            />
                            <InputError message={errors.email} />
                        </div>

                        <div className="flex items-center gap-2 rounded-xl border border-mist-800 bg-mist-950/40 px-4 py-3 text-xs leading-relaxed text-mist-400">
                            <Mail className="size-4 shrink-0 text-yellow-500" />
                            Пришлём ссылку для сброса пароля на указанный адрес.
                        </div>

                        <Button
                            type="submit"
                            className={authButtonClass}
                            disabled={processing}
                            data-test="email-password-reset-link-button"
                        >
                            {processing && <Spinner />}
                            Отправить ссылку
                        </Button>
                    </>
                )}
            </Form>

            <div className="mt-6 text-center text-sm text-mist-400">
                <TextLink href={login()} className={authTextLinkClass}>
                    Вернуться ко входу
                </TextLink>
            </div>
        </>
    );
}

ForgotPassword.layout = {
    title: 'Восстановление пароля',
    description: 'Укажите email — мы отправим ссылку для сброса пароля',
};
