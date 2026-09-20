
export default function Show({hero}) {
    return (
        <div>
            <h1>{ hero.name }</h1>
            <h2>{ hero.slug }</h2>
        </div>
    )
}