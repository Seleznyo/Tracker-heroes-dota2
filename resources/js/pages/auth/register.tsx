import { Form, Head } from '@inertiajs/react';
import InputError from '@/components/input-error';
import PasswordInput from '@/components/password-input';
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
import { store } from '@/routes/register';

type Props = {
    passwordRules: string;
};

export default function Register({ passwordRules }: Props) {
    return (
        <>
            <Head title="Регистрация" />

            <Form
                {...store.form()}
                resetOnSuccess={['password', 'password_confirmation']}
                disableWhileProcessing
                className="space-y-5"
            >
                {({ processing, errors }) => (
                    <>
                        <div className="space-y-2">
                            <Label htmlFor="name" className={authLabelClass}>
                                Имя
                            </Label>
                            <Input
                                id="name"
                                type="text"
                                required
                                autoFocus
                                tabIndex={1}
                                autoComplete="name"
                                name="name"
                                placeholder="Как к вам обращаться?"
                                className={authInputClass}
                            />
                            <InputError message={errors.name} />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email" className={authLabelClass}>
                                Email
                            </Label>
                            <Input
                                id="email"
                                type="email"
                                required
                                tabIndex={2}
                                autoComplete="email"
                                name="email"
                                placeholder="you@example.com"
                                className={authInputClass}
                            />
                            <InputError message={errors.email} />
                        </div>

                        <div className="space-y-2">
                            <Label
                                htmlFor="password"
                                className={authLabelClass}
                            >
                                Пароль
                            </Label>
                            <PasswordInput
                                id="password"
                                required
                                tabIndex={3}
                                autoComplete="new-password"
                                name="password"
                                placeholder="Придумайте пароль"
                                passwordrules={passwordRules}
                                className={authInputClass}
                            />
                            <p className="text-xs text-mist-500">
                                Используйте надёжный пароль — не менее 8
                                символов.
                            </p>
                            <InputError message={errors.password} />
                        </div>

                        <div className="space-y-2">
                            <Label
                                htmlFor="password_confirmation"
                                className={authLabelClass}
                            >
                                Повторите пароль
                            </Label>
                            <PasswordInput
                                id="password_confirmation"
                                required
                                tabIndex={4}
                                autoComplete="new-password"
                                name="password_confirmation"
                                placeholder="Введите пароль ещё раз"
                                passwordrules={passwordRules}
                                className={authInputClass}
                            />
                            <InputError
                                message={errors.password_confirmation}
                            />
                        </div>

                        <Button
                            type="submit"
                            className={authButtonClass}
                            tabIndex={5}
                            disabled={processing}
                            data-test="register-user-button"
                        >
                            {processing && <Spinner />}
                            Создать аккаунт
                        </Button>
                    </>
                )}
            </Form>

            <div className="mt-6 text-center text-sm text-mist-400">
                Уже есть аккаунт?{' '}
                <TextLink
                    href={login()}
                    tabIndex={6}
                    className={`font-semibold ${authTextLinkClass}`}
                >
                    Войти
                </TextLink>
            </div>
        </>
    );
}

Register.layout = {
    title: 'Создание аккаунта',
    description:
        'Зарегистрируйтесь, чтобы сохранять героев и следить за их статистикой',
};
