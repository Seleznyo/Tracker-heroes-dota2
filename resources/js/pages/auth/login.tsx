import { Form, Head } from '@inertiajs/react';
import InputError from '@/components/input-error';
import PasswordInput from '@/components/password-input';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import {
    authButtonClass,
    authInputClass,
    authLabelClass,
    authTextLinkClass,
} from '@/lib/auth-styles';
import { register } from '@/routes';
import { store } from '@/routes/login';
import { request } from '@/routes/password';

type Props = {
    status?: string;
    canResetPassword: boolean;
};

export default function Login({ status, canResetPassword }: Props) {
    return (
        <>
            <Head title="Вход" />

            {status && (
                <div className="mb-5 rounded-xl border border-emerald-500/25 bg-emerald-500/10 px-4 py-3 text-sm font-medium text-emerald-400">
                    {status}
                </div>
            )}

            <Form
                {...store.form()}
                resetOnSuccess={['password']}
                className="space-y-5"
            >
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
                                required
                                autoFocus
                                tabIndex={1}
                                autoComplete="email"
                                placeholder="you@example.com"
                                className={authInputClass}
                            />
                            <InputError message={errors.email} />
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center justify-between gap-3">
                                <Label
                                    htmlFor="password"
                                    className={authLabelClass}
                                >
                                    Пароль
                                </Label>

                                {canResetPassword && (
                                    <TextLink
                                        href={request()}
                                        className={`text-xs font-medium ${authTextLinkClass}`}
                                        tabIndex={5}
                                    >
                                        Забыли пароль?
                                    </TextLink>
                                )}
                            </div>

                            <PasswordInput
                                id="password"
                                name="password"
                                required
                                tabIndex={2}
                                autoComplete="current-password"
                                placeholder="Введите пароль"
                                className={authInputClass}
                            />
                            <InputError message={errors.password} />
                        </div>

                        <div className="flex items-center gap-2.5">
                            <Checkbox
                                id="remember"
                                name="remember"
                                tabIndex={3}
                                className="border-mist-600 data-[state=checked]:border-yellow-500 data-[state=checked]:bg-yellow-500 data-[state=checked]:text-mist-950"
                            />
                            <Label
                                htmlFor="remember"
                                className="text-sm font-normal text-mist-300"
                            >
                                Запомнить меня
                            </Label>
                        </div>

                        <Button
                            type="submit"
                            className={authButtonClass}
                            tabIndex={4}
                            disabled={processing}
                            data-test="login-button"
                        >
                            {processing && <Spinner />}
                            Войти
                        </Button>
                    </>
                )}
            </Form>

            <div className="mt-6 text-center text-sm text-mist-400">
                Нет аккаунта?{' '}
                <TextLink
                    href={register()}
                    tabIndex={6}
                    className={`font-semibold ${authTextLinkClass}`}
                >
                    Создать аккаунт
                </TextLink>
            </div>
        </>
    );
}

Login.layout = {
    title: 'Вход в аккаунт',
    description: 'Введите email и пароль, чтобы продолжить',
};
