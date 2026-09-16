
export default function Index({ heroes }) {
    return (
        <div>
            <h1>Heroes</h1>
            <div>
                {heroes.map(hero => (
                    <div>
                        <p>{hero.name}</p>
                        <p>{hero.slug}</p>
                    </div>
                ))}
            </div>
        </div>

    );