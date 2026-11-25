import type { PageProps } from "./types"

export function __SCAFFOLD_PASCAL__Page({ data }: PageProps) {
  return (
    <>
      <h1 className="govuk-heading-l">{data.title}</h1>
      <p className="govuk-body">{data.description}</p>
      <section aria-labelledby="__SCAFFOLD_SLUG__-items">
        <h2 id="__SCAFFOLD_SLUG__-items" className="govuk-heading-m">
          Seeded items
        </h2>
        <p className="govuk-body">{data.itemCount} total</p>
        <ul className="govuk-list">
          {data.items.map((item) => (
            <li key={item.id}>
              <h3 className="govuk-heading-s">{item.title}</h3>
              <p className="govuk-body">{item.summary}</p>
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}
