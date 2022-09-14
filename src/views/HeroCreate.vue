<template>
  <div class="HeroCreate">
    <h1>{{ id ? "编辑" : "新建" }}英雄</h1>

    <el-form
      label="名称"
      label-width="120px"
      ref="createFormRef"
      :model="createForm"
      :rules="create_rules"
    >
      <el-card>
        <el-tabs v-model="activeName">
          <el-tab-pane label="基本信息" name="basic">
            <el-form-item prop="name" label="输入英雄名称">
              <el-input v-model="createForm.name"> </el-input>
            </el-form-item>
            <el-form-item prop="title" label="输入英雄称号">
              <el-input v-model="createForm.title"> </el-input>
            </el-form-item>
            <el-form-item label="类型">
              <el-select
                v-model="createForm.category"
                placeholder="请选择"
                multiple
              >
                <el-option
                  v-for="item of categories"
                  :key="item._id"
                  :label="item.name"
                  :value="item._id"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="title" label="难度">
              <el-rate
                style="margin-top: 10px"
                :max="9"
                v-model="createForm.scores.diffcult"
                :show-score="true"
              >
              </el-rate>
            </el-form-item>
            <el-form-item prop="title" label="技能">
              <el-rate
                style="margin-top: 10px"
                :max="9"
                v-model="createForm.scores.skill"
                :show-score="true"
              >
              </el-rate>
            </el-form-item>
            <el-form-item prop="title" label="攻击力">
              <el-rate
                style="margin-top: 10px"
                :max="9"
                v-model="createForm.scores.attack"
                :show-score="true"
              >
              </el-rate>
            </el-form-item>
            <el-form-item prop="title" label="复活率">
              <el-rate
                style="margin-top: 10px"
                :max="9"
                v-model="createForm.scores.survive"
                :show-score="true"
              >
              </el-rate>
            </el-form-item>
            <el-form-item label="顺风出装">
              <el-select
                v-model="createForm.items1"
                placeholder="请选择"
                multiple
              >
                <el-option
                  v-for="item of items"
                  :key="item._id"
                  :label="item.name"
                  :value="item._id"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="逆风出装">
              <el-select
                v-model="createForm.items2"
                placeholder="请选择"
                multiple
              >
                <el-option
                  v-for="item of items"
                  :key="item._id"
                  :label="item.name"
                  :value="item._id"
                >
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item prop="name" label="上传英雄头像">
              <el-upload
                class="avatar-uploader"
                action="/api/hero/upload"
                 :headers="getAuthHeaders()"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
              >
                <img
                  v-if="createForm.avatar"
                  :src="createForm.avatar"
                  class="avatar"
                />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
            <el-form-item prop="name" label="使用技巧">
              <el-input type="textarea" v-model="createForm.useageTips">
              </el-input>
            </el-form-item>
            <el-form-item prop="name" label="战斗技巧">
              <el-input type="textarea" v-model="createForm.battleTips">
              </el-input>
            </el-form-item>
            <el-form-item prop="name" label="团队技巧">
              <el-input type="textarea" v-model="createForm.teamTips">
              </el-input>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="技能添加" name="skills">
            <el-button
              @click="createForm.skills.push({})"
              size="small"
              round
              type="primary"
            >
              <i class="el-icon-plus"></i> 技能添加</el-button
            >
            <!-- style="flex-wrap: wrap" hide -->
            <el-row type="flex">
              <el-col v-for="(item, index) in createForm.skills" :key="index">
                <el-form-item label="名称">
                  <el-input v-model="item.name"> </el-input>
                </el-form-item>
                <el-form-item label="描述" type="textarea">
                  <el-input v-model="item.description"></el-input>
                </el-form-item>
                <el-form-item label="小建议" type="textarea">
                  <el-input v-model="item.tips"></el-input>
                </el-form-item>
                <el-form-item prop="name" label="图标">
                  <el-upload
                    class="avatar-uploader"
                    action="/api/hero/upload"
                    :show-file-list="false"
                    :on-success="(res) => (item.icon = res.url)"
                    :before-upload="beforeAvatarUpload"
                  >
                    <img v-if="item.icon" :src="item.icon" class="avatar" />
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
                </el-form-item>

                <el-form-item>
                  <el-button
                    type="danger"
                    size="small"
                    @click="createForm.skills.splice(i, 1)"
                  >
                    删除
                  </el-button>
                </el-form-item>
              </el-col>
            </el-row>
          </el-tab-pane>
        </el-tabs>
      </el-card>
      <el-form-item>
        <el-button type="primary" native-type="submit" @click="addSubmit">
          保存
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "HeroCreate",
  props: {
    id: {},
  },
  data() {
    return {
      activeName: "basic",
      categories: [],
      items: [],
      createForm: {
        name: "",
        avatar: "",
        title: "",
        category: "",
        scores: {
          diffcult: 0,
          skill: 0,
          attack: 0,
          survive: 0,
        },
        items1: "",
        items2: "",
        useageTips: "",
        battleTips: "",
        teamTips: "",
        skills: [],
      },

      create_rules: {
        name: [
          // rules not filled the content
          { required: true, message: "分类名必填", trigger: "blur" },
          // rule filled the content
          {
            min: 2,
            max: 15,
            message: "分类长度要在2到15个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  created() {
    this.loadCategory();
    this.loadItems();
    this.id && this.loadData2();
  },
  methods: {
    async loadData2() {
      await this.$axios.get(`${process.env.VUE_APP_API}/api/hero/${this.id}`).then((res) => {
        // undefined fix
        this.createForm = Object.assign({}, this.createForm, res.data);
      });
    },
    async loadCategory() {
      await this.$axios.get(`${process.env.VUE_APP_API}/api/category`).then((res) => {
        // console.log(res);
        this.categories = res.data;
      });
    },
    async loadItems() {
      await this.$axios.get(`${process.env.VUE_APP_API}/api/item`).then((res) => {
        // console.log(res);
        this.items = res.data;
      });
    },
    async addSubmit(e) {
      // console.log(this.createForm);
      // React onClick and preventDefault() link refresh/redirect?
      // https://stackoverflow.com/questions/36316846/react-onclick-and-preventdefault-link-refresh-redirect
      e.preventDefault();
      if (this.id) {
        this.$refs.createFormRef.validate(async (valid) => {
          console.log(this.createForm);
          const body = this.createForm;

          if (!valid) {
            return false;
          }
          await this.$axios.put(`${process.env.VUE_APP_API}/api/hero/${this.id}`, body);
        });
      } else {
        this.$refs.createFormRef.validate(async (valid) => {
          console.log(this.createForm);
          const body = this.createForm;
          if (!valid) {
            return false;
          }
          await this.$axios.post(`${process.env.VUE_APP_API}/api/hero`, body);
        });
      }
      // if (!data) {
      //   // console.log("login failed");
      //   this.$message.error("保存失败");
      //   return;
      // }

      this.$message({
        message: "保存成功",
        type: "success",
      });
      this.$router.push("/hero/list");
    },

    handleAvatarSuccess(res) {
      this.createForm.avatar = res.url;
    },

    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
  },
};
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.el-form-item {
  margin-bottom: 10px;
}
</style>