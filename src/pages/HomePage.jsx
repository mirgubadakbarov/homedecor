import {useGetAllCategoriesQuery} from "../services/category"
import {useGetAllCollectionsQuery} from "../services/collections"
import {useGetDiscountDataQuery} from "../services/discount"
import {useGetHomeIntroQuery} from "../services/homeIntro"
import {useSetPageTitle} from "../hooks/useSetPageTitle"
import {useTranslation} from "react-i18next"
import {
  useGetPopularProductsQuery,
  useGetAllProductsHomeQuery,
} from "../services/product"
import AboutUs from "../components/AboutUs"
import CategoryElement from "../components/CategoryElement"
import Contact from "../components/Contact"
import Discount from "../components/Discount"
import HomeCollections from "../components/HomeCollections"
import HomeIntro from "../components/HomeIntro"
import HomeMainSlider from "../components/HomeMainSlider"
import HomeProducts from "../components/HomeProducts"
import PopularProducts from "../components/PopularProducts"
import ProductElement from "../components/ProductElement"
import React, {useState} from "react"
import {useLang} from "../context/LangContext"
import i18n from "../utils/i18n"
import {useEffect} from "react"
const HomePage = () => {
  const {lang} = useLang()
  const {data: categories} = useGetAllCategoriesQuery()
  const {data: collections} = useGetAllCollectionsQuery()
  const {data: discount} = useGetDiscountDataQuery()
  const {data: homeIntro, isLoading} = useGetHomeIntroQuery()

  const [popularProducts, setPopularProducts] = useState()

  const fetchHomeProducts = async () => {
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
      const filteredData = data.filter((product) => product.showInHome === true)
      setProducts(filteredData)

      return filteredData
    } catch (error) {
      console.error("Failed to fetch popular products:", error)
      throw error
    }
  }

  const fetchPopularProducts = async () => {
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
      const filteredData = data.filter((product) => product.isPopular === true)
      setPopularProducts(filteredData)

      return filteredData
    } catch (error) {
      console.error("Failed to fetch popular products:", error)
      throw error
    }
  }

  const [products, setProducts] = useState()
  const {t} = useTranslation()

  switch (lang) {
    case "Az":
      useSetPageTitle("Ana səhifə")
      break
    case "Ru":
      useSetPageTitle("Главная страница")
      break
    default:
      useSetPageTitle("Home page")
  }

  useEffect(() => {
    fetchPopularProducts()
  }, [])

  useEffect(() => {
    fetchHomeProducts()
  }, [])

  console.log(popularProducts)
  return (
    <main>
      {homeIntro && <HomeIntro lang={lang} {...homeIntro} />}
      {categories && (
        <HomeMainSlider>
          {categories.map((category) => (
            <CategoryElement
              lang={lang}
              type="category"
              key={category.id}
              {...category}
            />
          ))}
        </HomeMainSlider>
      )}

      <AboutUs lang={lang} />

      {discount && <Discount lang={lang} {...discount} />}

      {products && (
        <HomeProducts
          lang={lang}
          title={
            lang === "Az" ? "Məhsullar" : lang === "Ru" ? "Товары" : "Products"
          }
        >
          {products.map((product) => (
            <ProductElement lang={lang} key={product.id} {...product} />
          ))}
        </HomeProducts>
      )}
      {popularProducts && (
        <PopularProducts
          title={
            lang === "Az"
              ? "Populyar məhsullar"
              : lang === "Ru"
              ? "Популярные товары"
              : "Most Popular"
          }
        >
          {popularProducts.map((product) => (
            <ProductElement lang={lang} key={`a-${product.id}`} {...product} />
          ))}
        </PopularProducts>
      )}

      {collections && (
        <HomeCollections
          lang={lang}
          title={
            lang === "Az"
              ? "Kolleksiyalar"
              : lang === "Ru"
              ? "Коллекции"
              : "Collections"
          }
        >
          {collections.map((product) => (
            <CategoryElement lang={lang} key={`a-${product.id}`} {...product} />
          ))}
        </HomeCollections>
      )}

      <Contact lang={lang} />
    </main>
  )
}

export default HomePage
