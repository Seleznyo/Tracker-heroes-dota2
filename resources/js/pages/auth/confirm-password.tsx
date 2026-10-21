import { Form, Head } from '@inertiajs/react';
import InputError from '@/components/input-error';
import PasswordInput from '@/components/password-input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import {
    authButtonClass,
    authInputClass,
    authLabelClass,
} from '@/lib/auth-styles';
import { store } from '@/routes/password/confirm';

export default function ConfirmPassword() {
    return (
        <>
            <Head title="Подтверждение пароля" />

            <Form
                {...store.form()}
                resetOnSuccess={['password']}
                className="space-y-5"
            >
                {({ processing, errors }) => (
                    <>
                        <div className="space-y-2">
                            <Label
                                htmlFor="password"
                                className={authLabelClass}
                            >
                                Пароль
                            </Label>
                            <PasswordInput
                                id="password"
                                name="password"
                                placeholder="Введите текущий пароль"
                                autoComplete="current-password"
                                autoFocus
                                className={authInputClass}
                            />
                            <InputError message={errors.password} />
                        </div>

                        <Button
                            type="submit"
                            className={authButtonClass}
                            disabled={processing}
                            data-test="confirm-password-button"
                        >
                            {processing && <Spinner />}
                            Подтвердить
                        </Button>
                    </>
                )}
            </Form>
        </>
    );
}

ConfirmPassword.layout = {
    title: 'Подтверждение пароля',
    description:
        'Это защищённая часть приложения. Подтвердите пароль, чтобы продолжить.',
};
