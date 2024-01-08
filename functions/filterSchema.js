export default function filterSchema(schema) {
  return schema
    ?.replaceAll('cms.americanfirearms.org', 'www.americanfirearms.org')
    ?.replaceAll('firearms-wp.klikz.us', 'cms.americanfirearms.org')
}
