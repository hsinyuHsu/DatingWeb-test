<template>
  <div class="max-w-lg mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg">
    <h1 class="text-3xl font-semibold text-center mb-6 text-gray-800">建立活動</h1>

    <form @submit.prevent="submitForm" class="space-y-5">
      <InputField label="活動名稱" v-model="form.title" required />
      <InputField label="活動時間" type="datetime-local" v-model="form.date" required />
      <InputField label="地點" v-model="form.location" required />
      <TextAreaField label="描述" v-model="form.description" />

      <!-- 活動封面上傳 -->
      <div>
        <label class="block mb-1 font-medium text-gray-700">活動封面</label>
        <input type="file" @change="handleImageUpload" accept="image/*" class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />
        <p v-if="imagePreview" class="mt-2 text-gray-600">預覽:</p>
        <img v-if="imagePreview" :src="imagePreview" alt="活動封面" class="mt-2 w-32 h-32 object-cover rounded-lg" />
      </div>

      <!-- 人數限制 -->
      <div>
        <label class="block mb-1 font-medium text-gray-700">人數限制</label>
        <input v-model.number="form.limit" type="number" min="1" class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" required />
      </div>

      <!-- 類別下拉選單 -->
      <div>
        <label class="block mb-1 font-medium text-gray-700">活動類別</label>
        <select v-model="form.category" class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400">
          <option value="workshop">工作坊</option>
          <option value="conference">會議</option>
          <option value="meetup">聚會</option>
          <option value="party">派對</option>
          <option value="seminar">研討會</option>
        </select>
      </div>

      <button type="submit" class="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
        ➕ 建立活動
      </button>
    </form>

    <div v-if="submitted" class="mt-6 p-4 bg-green-50 border border-green-300 rounded-lg">
      <p class="text-green-700 font-medium">✅ 活動已建立！</p>
      <pre class="text-sm text-gray-700 mt-2">{{ form }}</pre>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const form = ref({
  title: '',
  date: '',
  location: '',
  description: '',
  limit: 10,  // 預設人數限制
  category: 'workshop',  // 預設選擇類別
})

const imagePreview = ref(null)
const submitted = ref(false)

const handleImageUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = () => {
      imagePreview.value = reader.result
    }
    reader.readAsDataURL(file)
  }
}

const submitForm = () => {
  console.log('活動建立資料：', form.value)
  submitted.value = true
}
</script>

<script>
export default {
  components: {
    InputField: {
      props: ['label', 'modelValue', 'type', 'required'],
      emits: ['update:modelValue'],
      template: `
        <div>
          <label class="block mb-1 font-medium text-gray-700">{{ label }}</label>
          <input
            :type="type || 'text'"
            :required="required"
            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            :value="modelValue"
            @input="$emit('update:modelValue', $event.target.value)"
          />
        </div>
      `,
    },
    TextAreaField: {
      props: ['label', 'modelValue'],
      emits: ['update:modelValue'],
      template: `
        <div>
          <label class="block mb-1 font-medium text-gray-700">{{ label }}</label>
          <textarea
            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            rows="4"
            :value="modelValue"
            @input="$emit('update:modelValue', $event.target.value)"
          ></textarea>
        </div>
      `,
    },
  },
}
</script>
