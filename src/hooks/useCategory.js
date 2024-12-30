import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";

const useCategory = () => {
  const [categories, setCategories] = useState([]);

  const getCategories = async () => {
    try {
      const { data } = await axiosInstance.get("/category");
      setCategories(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);
  return categories;
};

export default useCategory;
