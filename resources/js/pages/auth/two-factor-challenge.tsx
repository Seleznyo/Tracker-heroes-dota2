import { Form, Head, setLayoutProps } from '@inertiajs/react';
import { REGEXP_ONLY_DIGITS } from 'input-otp';
import { useMemo, useState } from 'react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from '@/components/ui/input-otp';
import { authButtonClass, authInputClass } from '@/lib/auth-styles';
import { store } from '@/routes/two-factor/login';

const OTP_MAX_LENGTH = 6;

export default function TwoFactorChallenge() {
    const [showRecoveryInput, setShowRecoveryInput] = useState<boolean>(false);
    const [code, setCode] = useState<string>('');

    const authConfigContent = useMemo<{
        title: string;
        description: string;
        toggleText: string;
    }>(() => {
        if (showRecoveryInput) {
            return {
                title: 'Код восстановления',
                description:
                    'Введите один из резервных кодов, чтобы получить доступ к аккаунту.',
                toggleText: 'войти по коду из приложения',
            };
        }

        return {
            title: 'Код аутентификации',
            description: 'Введите код из приложения-аутентификатора.',
            toggleText: 'войти по резервному коду',
        };
    }, [showRecoveryInput]);

    setLayoutProps({
        title: authConfigContent.title,
        description: authConfigContent.description,
    });

    const toggleRecoveryMode = (clearErrors: () => void): void => {
        setShowRecoveryInput(!showRecoveryInput);
        clearErrors();
        setCode('');
    };

    return (
        <>
            <Head title="Двухфакторная аутентификация" />

            <Form
                {...store.form()}
                className="space-y-5"
                resetOnError
                resetOnSuccess={!showRecoveryInput}
            >
                {({ errors, processing, clearErrors }) => (
                    <>
                        {showRecoveryInput ? (
                            <>
                                <Input
                                    name="recovery_code"
                                    type="text"
                                    placeholder="Введите резервный код"
                                    autoFocus={showRecoveryInput}
                                    required
                                    className={authInputClass}
                                />
                                <InputError message={errors.recovery_code} />
                            </>
                        ) : (
                            <div className="flex flex-col items-center justify-center gap-3">
                                <InputOTP
                                    name="code"
                                    maxLength={OTP_MAX_LENGTH}
                                    value={code}
                                    onChange={(value) => setCode(value)}
                                    disabled={processing}
                                    pattern={REGEXP_ONLY_DIGITS}
                                    autoFocus
                                    containerClassName="justify-center"
                                >
                                    <InputOTPGroup className="gap-2">
                                        {Array.from(
                                            { length: OTP_MAX_LENGTH },
                                            (_, index) => (
                                                <InputOTPSlot
                                                    key={index}
                                                    index={index}
                                                    className="size-11 rounded-xl border border-mist-700 bg-mist-950/60 text-base text-white first:rounded-xl first:border-l last:rounded-xl"
                                                />
                                            ),
                                        )}
                                    </InputOTPGroup>
                                </InputOTP>
                                <InputError message={errors.code} />
                            </div>
                        )}

                        <Button
                            type="submit"
                            className={authButtonClass}
                            disabled={processing}
                        >
                            Продолжить
                        </Button>

                        <div className="text-center text-sm text-mist-400">
                            <span>или </span>
                            <button
                                type="button"
                                className="cursor-pointer font-medium text-yellow-400 underline underline-offset-4 transition-colors hover:text-yellow-300"
                                onClick={() => toggleRecoveryMode(clearErrors)}
                            >
                                {authConfigContent.toggleText}
                            </button>
                        </div>
                    </>
                )}
            </Form>
        </>
    );
}
