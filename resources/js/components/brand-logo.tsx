import { Swords } from 'lucide-react';
import { cn } from '@/lib/utils';

type Props = {
    className?: string;
    showSubtitle?: boolean;
};

export default function BrandLogo({ className, showSubtitle = true }: Props) {
    return (
        <span className={cn('inline-flex items-center gap-3', className)}>
            <span className="relative flex size-10 shrink-0 items-center justify-center rounded-xl bg-yellow-500 text-mist-950 shadow-[0_0_28px_-6px_rgba(234,179,8,0.9)]">
                <Swords className="size-5.5" strokeWidth={2.4} />
            </span>

            <span className="flex flex-col leading-none">
                <span className="text-base font-black tracking-tight text-white uppercase">
                    Dota Tracker
                </span>
                {showSubtitle && (
                    <span className="mt-1 text-[10px] font-semibold tracking-[0.28em] text-mist-400 uppercase">
                        Hero analytics
                    </span>
                )}
            </span>
        </span>
    );
}
