import React from "react";
import { getCategories } from "@/entities/category/api/categoryApi";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch";
import { useAppSelector } from "@/shared/lib/hooks/useAppSelector";
import { Button } from "@/shared/ui/button";
import { FiEdit } from "react-icons/fi";
import { TbTrash } from "react-icons/tb";
import {
  AddCategoryModal,
  DeleteCategoryModal,
  EditCategoryModal,
  setActiveCategory,
} from "@/entities/category";
import { GCategory } from "@/entities/category/model/interfaces";

export const CategoryPage = () => {
  const dispatch = useAppDispatch();
  const categrories = useAppSelector(
    (state) => state.categorySlice.categories.data
  );

  const [isOpenAddCategoryModal, setIsOpenAddCategoryModal] =
    React.useState(false);

  const [isOpenEditCategoryModal, setIsOpenEditCategoryModal] =
    React.useState(false);

  const [isOpenDeleteCategoryModal, setIsOpenDeleteCategoryModal] =
    React.useState(false);

  React.useEffect(() => {
    dispatch(getCategories());
  }, []);

  const openAddCategory = () => {
    setIsOpenAddCategoryModal(true);
  };

  const openEditCategory = (category: GCategory) => {
    dispatch(setActiveCategory(category));
    setIsOpenEditCategoryModal(true);
  };

  const openDeleteCategory = (category: GCategory) => {
    dispatch(setActiveCategory(category));
    setIsOpenDeleteCategoryModal(true);
  };

  return (
    <section>
      <h2 className="text-xl mb-4">Category list</h2>
      <div className="w-full h-[400px] bg-secondary rounded-md">
        <div className="p-4">
          <Button
            onClick={openAddCategory}
            className="ml-auto block"
            title="Add Category"
          />
        </div>
        <ul>
          <li className="flex border-primary border-t border-b px-8 py-2 border-opacity-20 flex-wrap justify-between items-center">
            <div className="basis-[25%]">Categories</div>
            <div className="basis-[25%] text-right">Actions</div>
          </li>
          {categrories.map((category, i) => {
            return (
              <li
                key={i}
                className="flex border-primary border-t border-b px-8 py-2 border-opacity-20 flex-wrap justify-between items-center"
              >
                <div className="basis-[25%]">{category.name}</div>
                <div className="basis-[25%] text-right">
                  <div className="flex items-center justify-end gap-x-4">
                    <button onClick={() => openDeleteCategory(category)}>
                      <TbTrash size={19} />
                    </button>
                    <button onClick={() => openEditCategory(category)}>
                      <FiEdit size={17} />
                    </button>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      {/* MODALS */}

      <AddCategoryModal
        isOpen={isOpenAddCategoryModal}
        setIsOpen={setIsOpenAddCategoryModal}
      />

      <EditCategoryModal
        isOpen={isOpenEditCategoryModal}
        setIsOpen={setIsOpenEditCategoryModal}
      />

      <DeleteCategoryModal
        isOpen={isOpenDeleteCategoryModal}
        setIsOpen={setIsOpenDeleteCategoryModal}
      />
    </section>
  );
};
