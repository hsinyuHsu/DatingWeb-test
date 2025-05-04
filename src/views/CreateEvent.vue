<template>
  <div class="max-w-2xl mx-auto bg-white p-6 rounded-2xl shadow-xl">
    <h2 class="text-2xl font-bold mb-6">建立揪團活動</h2>
    <form @submit.prevent="handleSubmit" class="space-y-4">
      <div>
        <label class="block text-sm font-medium mb-1">活動名稱</label>
        <input v-model="title" type="text" class="input" placeholder="例如：週五桌遊夜" required />
      </div>

      <div>
        <label class="block text-sm font-medium mb-1">活動類型</label>
        <select v-model="category" class="input">
          <option disabled value="">請選擇</option>
          <option>聚餐</option>
          <option>桌遊</option>
          <option>旅遊</option>
          <option>電影</option>
          <option>戶外活動</option>
        </select>
      </div>

      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium mb-1">日期時間</label>
          <input v-model="datetime" type="datetime-local" class="input" required />
        </div>
        <div>
          <label class="block text-sm font-medium mb-1">地點</label>
          <input v-model="location" type="text" class="input" placeholder="例如：台北車站附近" required />
        </div>
      </div>

      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium mb-1">人數上限</label>
          <input v-model.number="maxParticipants" type="number" class="input" min="2" required />
        </div>
        <div>
          <label class="block text-sm font-medium mb-1">費用方式</label>
          <select v-model="costType" class="input">
            <option>AA制</option>
            <option>免費</option>
            <option>預收</option>
          </select>
        </div>
      </div>

      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium mb-1">性別限制</label>
          <select v-model="genderLimit" class="input">
            <option>不限</option>
            <option>僅限男生</option>
            <option>僅限女生</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium mb-1">年齡範圍</label>
          <input v-model="ageRange" type="text" class="input" placeholder="例如：20-35 歲" />
        </div>
      </div>

      <div>
        <label class="block text-sm font-medium mb-1">活動簡介</label>
        <textarea v-model="description" class="input h-28 resize-none" placeholder="簡單介紹活動內容"></textarea>
      </div>

      <div class="flex justify-end gap-3 pt-4">
        <button type="button" @click="resetForm" class="btn-secondary">清除</button>
        <button type="submit" class="btn-primary">發布活動</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const title = ref('')
const category = ref('')
const datetime = ref('')
const location = ref('')
const maxParticipants = ref(10)
const costType = ref('AA制')
const genderLimit = ref('不限')
const ageRange = ref('')
const description = ref('')

function handleSubmit() {
  const eventData = {
    title: title.value,
    category: category.value,
    datetime: datetime.value,
    location: location.value,
    maxParticipants: maxParticipants.value,
    costType: costType.value,
    genderLimit: genderLimit.value,
    ageRange: ageRange.value,
    description: description.value,
  }
  console.log('活動內容：', eventData)
  alert('活動已發布！')
}

function resetForm() {
  title.value = ''
  category.value = ''
  datetime.value = ''
  location.value = ''
  maxParticipants.value = 10
  costType.value = 'AA制'
  genderLimit.value = '不限'
  ageRange.value = ''
  description.value = ''
}
</script>

<style scoped>
.input {
  @apply w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500;
}
.btn-primary {
  @apply bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition;
}
.btn-secondary {
  @apply border border-gray-300 px-4 py-2 rounded-xl text-gray-700 hover:bg-gray-100;
}
</style>
