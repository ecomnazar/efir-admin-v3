import React from "react";
import { FiEdit } from "react-icons/fi";
import { TbTrash } from "react-icons/tb";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch";
import { useAppSelector } from "@/shared/lib/hooks/useAppSelector";
import { Button } from "@/shared/ui/button";
import { AddCategoryModal, DeleteCategoryModal, EditCategoryModal, setActiveCategory } from "@/entities/category";
import { GCategory } from "@/entities/category/model/interfaces";
import { getCategories } from "@/entities/category/api/categoryApi";

export const CategoryList = () => {
  const dispatch = useAppDispatch();
  const categrories = useAppSelector((state) => state.categorySlice.categories.data);
  const loading = useAppSelector((state) => state.categorySlice.categories.loading);
  const hasNext = useAppSelector((state) => state.categorySlice.categories.next);
  const hasPrev = useAppSelector((state) => state.categorySlice.categories.prev);
  const nextPage = useAppSelector((state) => state.categorySlice.nextPage);

  const [isOpenAddCategoryModal, setIsOpenAddCategoryModal] = React.useState(false);
  const [isOpenEditCategoryModal, setIsOpenEditCategoryModal] = React.useState(false);
  const [isOpenDeleteCategoryModal, setIsOpenDeleteCategoryModal] = React.useState(false);

  const openAddCategory = () => setIsOpenAddCategoryModal(true);

  const openEditCategory = (category: GCategory) => {
    dispatch(setActiveCategory(category));
    setIsOpenEditCategoryModal(true);
  };

  const openDeleteCategory = (category: GCategory) => {
    dispatch(setActiveCategory(category));
    setIsOpenDeleteCategoryModal(true);
  };

  const loadMore = () => dispatch(getCategories(nextPage))

  React.useEffect(() => {
    if (!hasPrev) {
      dispatch(getCategories(nextPage));
    }
  }, []);

  return (
    <>
      <div className="w-full bg-secondary rounded-md pb-4">
        <div className="p-4">
          <Button
            onClick={openAddCategory}
            className="ml-auto block"
            title="Add Category"
          />
        </div>
        <ul>
          <li className="flex border-primary border-t border-b px-8 py-2 border-opacity-20 flex-wrap justify-between items-center">
            <div className="basis-[25%] text-[16px]">Categories</div>
            <div className="basis-[25%] text-[16px] text-right">Actions</div>
          </li>
          {categrories.map((category, i) => {
            return (
              <li
                key={i}
                className="flex border-primary border-t border-b px-8 py-2 border-opacity-20 flex-wrap justify-between items-center"
              >
                <div className="basis-[25%] text-[15px]">{category.name}</div>
                <div className="basis-[25%] text-[15px] text-right">
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
        {hasNext && (
          <Button
            loading={loading}
            onClick={loadMore}
            className="mx-auto block mt-4"
            title={"Load more"}
          />
        )}
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
    </>
  );
};
