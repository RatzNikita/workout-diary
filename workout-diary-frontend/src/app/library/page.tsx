import Link from "next/link";


export default function Library() {

    return (
        <section>
            <h3>Library</h3>
            <Link href={'/library/exercises'}>To exercises</Link>
        </section>
    )
}