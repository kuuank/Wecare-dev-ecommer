"use client";
import { builder, Builder } from "@builder.io/react";
import DataverseContent from "../components/DataverseContent";
import Page from "./app/[...page]/[...page]";
import MainContent from "./components/MainContent";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Layout from "./components/Layout";
import Navigation from "./components/Navigation";
import SearchBar from "./components/SearchBar";
import Sidebar from "./components/Sidebar";
import ProductList from "./components/SanPham/productList";

builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY!);

Builder.registerComponent(ProductList, {
  name: "ProductList",
});

Builder.registerComponent(Header, {
  name: "Header",
});
Builder.registerComponent(Footer, {
  name: "Footer",
});
Builder.registerComponent(Layout, {
  name: "Layout",
});
Builder.registerComponent(Navigation, {
  name: "Navigation",
});
Builder.registerComponent(SearchBar, {
  name: "SearchBar",
});
Builder.registerComponent(Sidebar, {
  name: "Sidebar",
});

Builder.registerComponent(DataverseContent, {
  name: "DataverseContent",
});
Builder.registerComponent(MainContent, {
  name: "MainContent",
});

Builder.registerComponent(Page, {
  name: "Page",
  inputs: [
    {
      name: "params",
      type: "object",
      hideFromUI: true,
      meta: {
        ts: "{ page: string[]; }",
      },
      required: true,
    },
  ],
});
