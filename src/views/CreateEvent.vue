<template>
  <div class="create-event">
    <h2>發起活動</h2>

    <!-- 封面上傳 -->
    <div class="form-group">
      <label>活動封面</label>
      <input type="file" @change="handleImageUpload" accept="image/*" />
      <div v-if="coverImageUrl" class="preview-img">
        <img :src="coverImageUrl" alt="封面預覽" />
      </div>
    </div>

    <div class="form-group">
      <label>活動名稱</label>
      <input
        type="text"
        v-model="title"
        placeholder="例如：信義區酒吧之夜"
      />
      <small v-if="submitted && !title" class="error">請輸入活動名稱</small>
    </div>

    <div class="form-group">
      <label>活動說明</label>
      <textarea
        v-model="description"
        placeholder="簡單說明活動內容..."
      ></textarea>
    </div>

    <!-- 地點自動補完 -->
    <div class="form-group">
      <label>活動地點</label>
      <input
        type="text"
        id="location"
        ref="autocompleteInput"
        v-model="location"
        placeholder="例如：信義區酒吧"
      />
      <small v-if="submitted && !location" class="error">請輸入活動地點</small>
    </div>

    <div class="form-group">
      <label>活動時間</label>
      <input type="datetime-local" v-model="dateTime" />
      <small v-if="submitted && !dateTime" class="error">請選擇活動時間</small>
    </div>

    <div class="form-group">
      <label>活動權限</label>
      <select v-model="visibility">
        <option value="public">公開活動</option>
        <option value="invite">只限邀請</option>
      </select>
    </div>

    <div class="actions">
      <button @click="saveDraft">儲存草稿</button>
      <button @click="submitEvent">建立活動</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "CreateEvent",
  data() {
    return {
      title: "",
      description: "",
      location: "",
      dateTime: "",
      visibility: "public",
      coverImageUrl: "",
      submitted: false,
    };
  },
  mounted() {
    this.initGoogleAutocomplete();
    this.loadDraft();
  },
  methods: {
    handleImageUpload(e) {
      const file = e.target.files[0];
      if (!file) return;

      const validTypes = ["image/jpeg", "image/png"];
      const maxSize = 2 * 1024 * 1024; // 2MB

      if (!validTypes.includes(file.type)) {
        alert("僅接受 JPG 或 PNG 格式圖片");
        return;
      }

      if (file.size > maxSize) {
        alert("圖片大小不能超過 2MB");
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        this.coverImageUrl = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    initGoogleAutocomplete() {
      const input = this.$refs.autocompleteInput;
      if (window.google && window.google.maps) {
        const autocomplete = new window.google.maps.places.Autocomplete(input, {
          types: ["geocode"],
        });
        autocomplete.addListener("place_changed", () => {
          const place = autocomplete.getPlace();
          this.location = place.formatted_address;
        });
      } else {
        console.warn("Google Maps API 尚未載入");
      }
    },
    saveDraft() {
      const data = {
        title: this.title,
        description: this.description,
        location: this.location,
        dateTime: this.dateTime,
        visibility: this.visibility,
        coverImageUrl: this.coverImageUrl,
      };
      localStorage.setItem("eventDraft", JSON.stringify(data));
      alert("草稿已儲存！");
    },
    loadDraft() {
      const draft = localStorage.getItem("eventDraft");
      if (draft) {
        Object.assign(this, JSON.parse(draft));
      }
    },
    submitEvent() {
      this.submitted = true;
      if (!this.title || !this.location || !this.dateTime) {
        alert("請完整填寫必要欄位");
        return;
      }
      alert("活動已建立！");
      localStorage.removeItem("eventDraft");
      // 送出資料邏輯可在這裡串接 API
    },
  },
};
</script>

<style scoped>
.create-event {
  max-width: 600px;
  margin: 2rem auto;
  padding: 2rem;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}
.create-event h2 {
  text-align: center;
  margin-bottom: 1.5rem;
}
.form-group {
  margin-bottom: 1.2rem;
}
.form-group label {
  display: block;
  font-weight: bold;
  margin-bottom: 0.4rem;
}
.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 0.6rem;
  border: 1px solid #ccc;
  border-radius: 6px;
}
.preview-img img {
  max-width: 100%;
  margin-top: 0.8rem;
  border-radius: 8px;
}
.actions {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
}
.actions button {
  flex: 1;
  padding: 0.8rem;
  border: none;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
}
.actions button:first-child {
  background: #ddd;
}
.actions button:last-child {
  background: #4f46e5;
  color: white;
}
.actions button:disabled {
  background: #aaa;
  cursor: not-allowed;
}
.error {
  color: red;
  font-size: 0.85rem;
  margin-top: 0.3rem;
  display: block;
}
</style>
