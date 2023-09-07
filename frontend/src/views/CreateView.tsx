import BaseInput from '@/components/UI/BaseInput';
import BaseButton from '@/components/UI/BaseButton';
import BaseSelect from '@/components/UI/BaseSelect';
import { useRest } from '@/services';
import { CreateProduct } from '@/services/products/types';
import { useShopStore } from '@/store/shopStore';
import { useFormik } from 'formik';

export default function CreateView() {
  const api = useRest();
  const { categories } = useShopStore();

  const formik = useFormik<CreateProduct>({
    initialValues: {
      title: '',
      description: '',
      price: 0,
      category: {
        title: '',
        value: 0
      },
      imageUrl: ''
    },
    onSubmit: async (values) => {
      const category =
        typeof values.category === 'object' ? values.category.value : values.category;
      await api.products.postProduct({ ...values, category });
    }
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
        <BaseInput
          value={formik.values.title}
          onChange={(e) => formik.setFieldValue('title', e.currentTarget.value)}
          name="title"
          label="Title"
        />
        <BaseInput
          value={formik.values.description}
          onChange={(e) => formik.setFieldValue('description', e.currentTarget.value)}
          name="description"
          label="Description"
        />
        <BaseInput
          value={formik.values.price}
          onChange={(e) => formik.setFieldValue('price', e.currentTarget.value)}
          name="price"
          label="Price"
          type="number"
        />
        <BaseSelect
          placeholder="Select category"
          label="Category"
          rouneded
          name="category"
          selected={formik.values.category}
          onSelect={(e) => formik.setFieldValue('category', e)}
          options={categories.map((category) => ({ title: category.title, value: category.id }))}
        />
        <BaseInput
          value={formik.values.imageUrl}
          onChange={(e) => formik.setFieldValue('imageUrl', e.currentTarget.value)}
          name="imageUrl"
          label="Image URL"
        />
        <BaseButton text="Create" />
      </form>
    </div>
  );
}
