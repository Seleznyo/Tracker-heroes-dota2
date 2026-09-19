import { Link } from "@inertiajs/react";

export default function Index({ heroes }) {
    return (
        <div>
            <h1>Heroes</h1>
            <div>
                {heroes.map(hero => (
                    <div>
                        <Link href={`heroes/${hero.name}`}>{hero.name}</Link>
                        <p>{hero.slug}</p>
                    </div>
                ))}
            </div>
        </div>

    );
}