import { gql } from "apollo-boost";




  const ALLPRODUCTS = gql`
query GetProducts($type: String!) {
  category(input: { title: $type }) {
    name
    products {
      id
      name
      inStock
      gallery
      description
      category
      attributes {
        id
        name
        type
        items {
          displayValue
          value
          id
        }
      }
      prices {
        currency {
          label
          symbol
        }
        amount
      }
      brand
    }
  }
}
`;


  const Currencies = gql`
  query GetCurrencies {
    currencies {
      symbol
      label
    }
  }
`;


  const NAVDATA = gql`
  query GetHeaderData {
    categories {
      name
    }
    currencies {
      symbol
      label
    }
  }
`;

 const Product = gql`
  query GetProduct($id: String!) {
    product(id: $id) {
      id
      name
      inStock
      gallery
      description
      category
      attributes {
        id
        name
        type
        items {
          displayValue
          value
          id
        }
      }
      prices {
        currency {
          label
          symbol
        }
        amount
      }
      brand
    }
  }
`;


const CART = gql`
  query GetCartData {
    category {
      products {
        id
        name
        prices {
          currency {
            label
            symbol
          }
          amount
        }
        attributes {
          id
          name
          type
          items {
            id
            displayValue
            value
          }
        }
        gallery
        brand
      }
    }
    currencies {
      symbol
      label
    }
  }
`;
export {CART, Product, NAVDATA, Currencies,ALLPRODUCTS };