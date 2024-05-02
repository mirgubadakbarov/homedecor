import React, {useEffect, useState} from "react"
import {useParams} from "react-router-dom"
import DetailsSlider from "../components/DetailsSlider"
import DetailsTop from "../components/DetailsTop"
import ProductDetails from "../components/ProductDetails"
import SimilarItems from "../components/SimilarItems"
import {useLang} from "../context/LangContext"
import {useSetPageTitle} from "../hooks/useSetPageTitle"
import {useGetProductByIdQuery} from "../services/product"

const DetailPage = () => {
  const {lang} = useLang()
  switch (lang) {
    case "Az":
      useSetPageTitle("Məhsul")
      break
    case "Ru":
      useSetPageTitle("Товар")
      break
    default:
      useSetPageTitle("Product")
  }
  const params = useParams()
  // const {data: product, isLoading} = useGetProductByIdQuery(params.id)
  const [product, setProduct] = useState(null)

  const fetchProductById = async (id) => {
    const url = "http://localhost:3000/products"

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      const filteredData = data.find((product) => product.id === +id)
      setProduct(filteredData)

      return filteredData
    } catch (error) {
      console.error("Failed to fetch popular products:", error)
      throw error
    }
  }

  useEffect(() => {
    fetchProductById(params.id)
  }, [params.id])
  return (
    <main>
      {product && (
        <>
          <DetailsTop>
            <DetailsSlider>
              <img
                style={{width: "200px", height: "200px"}}
                src={product?.img}
                alt=""
              />
              <img
                style={{width: "200px", height: "200px"}}
                src={product?.img}
                alt=""
              />
              <img
                style={{width: "200px", height: "200px"}}
                src={product?.img}
                alt=""
              />
              <img
                style={{width: "200px", height: "200px"}}
                src={product?.img}
                alt=""
              />
              <img
                style={{width: "200px", height: "200px"}}
                src={product?.img}
                alt=""
              />
              <img
                style={{width: "200px", height: "200px"}}
                src={product?.img}
                alt=""
              />
              <img
                style={{width: "200px", height: "200px"}}
                src={product?.img}
                alt=""
              />
            </DetailsSlider>
            {product && <ProductDetails lang={lang} {...product} />}
          </DetailsTop>
          <SimilarItems
            lang={lang}
            productId={product.id}
            categoryId={product.categoryId}
          />
        </>
      )}
    </main>
  )
}

export default DetailPage
