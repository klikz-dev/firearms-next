import Title from '@/components/molecules/Title'
import toCapitalize from '@/functions/toCapitalize'
import CrossSell from './CrossSell'
import Product from './Product'

export default function OtherProducts({ page, products, product }) {
  const highest =
    products[products.length - 1]?.sale_price || product.sale_price

  const search = page.title
    .split(' ')
    .reduce((accumulator, piece) => {
      if (accumulator.length === 0) {
        return piece
      } else if (accumulator.length < 30) {
        return `${accumulator} ${piece}`
      } else {
        return accumulator
      }
    }, '')
    .replace(/&+/g, 'and')

  return (
    <div className='mb-12'>
      <Title>
        <h3>Other {toCapitalize(page.title)} for Sale</h3>
      </Title>

      {products.map((p, index) => (
        <Product key={index} {...p} />
      ))}

      {product?.updated_at && (
        <>
          <CrossSell
            product={{
              ...product,
              retailer: 'Palmetto State Armory',
              sale_price: highest * (1 + page.rel_Palmetto / 100),
              buy_link: `https://www.avantlink.com/click.php?tt=el&merchant_id=366d8fa6-2a72-4d59-bc31-583f74cfd91b&website_id=8e050264-837a-449c-93fc-952a4c1e3806&url=https%3A%2F%2Fpalmettostatearmory.com%2Fcatalogsearch%2Fresult%2F%3Fq%3D${search}`,
            }}
          />

          <CrossSell
            product={{
              ...product,
              retailer: "Brownell's",
              sale_price:
                highest * (1 + (page.rel_Palmetto * page.rel_Brownells) / 100),
              buy_link: `https://www.avantlink.com/click.php?tt=el&merchant_id=855e0b56-67a2-40d0-aa2b-a0764ca94489&website_id=8e050264-837a-449c-93fc-952a4c1e3806&url=https%3A%2F%2Fwww.brownells.com%2Fsearch%2Findex.htm%3Fk%3D${search}`,
            }}
          />

          <CrossSell
            product={{
              ...product,
              retailer: 'EuroOptic',
              sale_price:
                highest *
                (1 +
                  (page.rel_Palmetto *
                    page.rel_Brownells *
                    page.rel_EuroOptic) /
                    100),
              buy_link: `https://www.avantlink.com/click.php?tt=el&merchant_id=ff9af6fd-7a8c-4a4a-91a6-ea4f01435e58&website_id=8e050264-837a-449c-93fc-952a4c1e3806&url=https%3A%2F%2Fwww.eurooptic.com%2Fsearch.aspx%3Fkeyword%3D${search}`,
            }}
          />

          <CrossSell
            product={{
              ...product,
              retailer: 'Gritr Outdoors',
              sale_price:
                highest *
                (1 +
                  (page.rel_Palmetto *
                    page.rel_Brownells *
                    page.rel_EuroOptic *
                    page.rel_Gritr) /
                    100),
              buy_link: `https://www.avantlink.com/click.php?tt=el&merchant_id=efae77e0-131e-439a-a8e7-463bc6478078&website_id=8e050264-837a-449c-93fc-952a4c1e3806&url=https%3A%2F%2Fgritroutdoors.com%2Fsearch.php%3Fsearch_query%3D${search}%26section%3Dproduct`,
            }}
          />

          <CrossSell
            product={{
              ...product,
              retailer: 'Guns.com',
              sale_price:
                highest *
                (1 +
                  (page.rel_Palmetto *
                    page.rel_Brownells *
                    page.rel_EuroOptic *
                    page.rel_Gritr *
                    page.rel_Guns) /
                    100),
              buy_link: `https://www.avantlink.com/click.php?tt=el&merchant_id=7486894c-de29-4e50-8d4e-87ffc84a0095&website_id=8e050264-837a-449c-93fc-952a4c1e3806&url=https%3A%2F%2Fwww.guns.com%2Fsearch%3Fkeyword%3D${search}`,
            }}
          />

          <CrossSell
            product={{
              ...product,
              retailer: 'Primary Arms',
              sale_price:
                highest *
                (1 +
                  (page.rel_Palmetto *
                    page.rel_Brownells *
                    page.rel_EuroOptic *
                    page.rel_Gritr *
                    page.rel_Guns *
                    page.rel_PrimaryArms) /
                    100),
              buy_link: `https://www.avantlink.com/click.php?tt=el&merchant_id=1a498dc6-68d7-4869-a04b-fb2a535f2650&website_id=8e050264-837a-449c-93fc-952a4c1e3806&url=https%3A%2F%2Fwww.primaryarms.com%2Fsearch%3Fkeywords%3D${search}`,
            }}
          />

          <CrossSell
            product={{
              ...product,
              retailer: "Sportsman's Guide",
              sale_price:
                highest *
                (1 +
                  (page.rel_Palmetto *
                    page.rel_Brownells *
                    page.rel_EuroOptic *
                    page.rel_Gritr *
                    page.rel_Guns *
                    page.rel_PrimaryArms *
                    page.rel_Sportsman) /
                    100),
              buy_link: `https://www.avantlink.com/click.php?tt=el&merchant_id=75ccade3-2dce-4104-a224-9b0a1a59a974&website_id=8e050264-837a-449c-93fc-952a4c1e3806&url=https%3A%2F%2Fwww.sportsmansguide.com%2Fproductlist%3Fk%3D${search}`,
            }}
          />
        </>
      )}
    </div>
  )
}
