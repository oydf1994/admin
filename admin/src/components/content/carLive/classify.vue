<template>
  <div>
    <div>
      <el-button size="small" type="primary" icon="el-icon-plus" @click="dialogVisible = true">添加</el-button>
      <el-button size="small" type="primary" icon="el-icon-close" @click="batchDel">批量删除</el-button>
      <span>分类:</span>
      <el-select v-model="value" placeholder="请选择" size="small" @change="classifyChange">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
      <span>关键字:</span>
      <el-input v-model="input" placeholder="请输入内容" size="small"></el-input>
      <el-button size="small" type="primary" @click="btn">查询</el-button>
    </div>
    <el-table ref="multipleTable" :data="tableData3" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column label="标题">
        <template slot-scope="scope">{{ scope.row.title }}</template>
      </el-table-column>
      <el-table-column prop="category_name" label="所属分类" width="120">
      </el-table-column>
      <el-table-column label="浏览量" prop="click" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="comment" label="评论量" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="status" label="状态" show-overflow-tooltip>
        <template slot-scope="scope">
          <a href="#" v-if="scope.row.status == 0" @click="status(0)">上线</a>
          <a href="#" v-if="scope.row.status == 1" @click="status(1)">下线</a>
        </template>
      </el-table-column>
      <el-table-column prop="create_time" label="发布日期" show-overflow-tooltip>
      </el-table-column>
      <el-table-column label="操作" show-overflow-tooltip>
        <template slot-scope="scope">
          <el-button type="text" size="small" v-if="scope.row.top == 0" @click="top(1,scope.row.id)">置顶</el-button>
          <el-button type="text" size="small" v-if="scope.row.top == 1" @click="top(0,scope.row.id)">取消置顶</el-button>
          <el-button type="text" size="small" @click="edit(scope.row)">编辑</el-button>
          <el-button type="text" size="small">删除</el-button>
          <el-button type="text" size="small" @click="review(scope.row.id)">评论</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[100, 200, 300, 400]"
      :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="400">
    </el-pagination>
    <transition name="el-fade-in-linear">
      <div v-show="dialogVisible" class="cpm center">
        <div class="cpm_tit">
          添加内容
          <i class="el-icon-close cpm_i" @click="dialogVisible=false"></i>
        </div>
        <div class="cpm_body">
          <div class="cpm_line">
            <span class="span">分类:</span>
            <el-select v-model="carLives.c_id" placeholder="请选择" size="small">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div class="cpm_line">
            <span class="span">标题:</span>
            <el-input v-model="carLives.title" placeholder="请输入内容" size="small"></el-input>
          </div>
          <!-- <div class="cpm_line">
            <span class="span">副标题:</span>
            <el-input v-model="input" placeholder="请输入内容" size="small"></el-input>
          </div> -->
          <div class="cpm_line">
            <span class="span">文章类型:</span>
            <el-radio-group v-model="carLives.type">
              <el-radio label='1'>图文文章</el-radio>
              <el-radio label='2'>视频文章</el-radio>
            </el-radio-group>
          </div>
          <div class="cpm_line">
            <span class="span">是否上线:</span>
            <el-radio-group v-model="carLives.status">
              <el-radio label='1'>上线</el-radio>
              <el-radio label='0'>隐藏</el-radio>
            </el-radio-group>
          </div>
          <div class="cpm_img">
            <span>封面:</span>
            <div class="addImg">
              <img src="../../../assets/images/add_image@2x.png" alt="" id="addImg">
              <input type="file" @change="imgChange">
            </div>
          </div>
          <div>
            <div class="cpm_line">
              <span class="span">视频地址:</span>
              <el-input v-model="carLives.video" placeholder="请输入内容" size="small"></el-input>
            </div>
            <div class="editor-container">
              <UE :config='config' ref="ue"></UE>
            </div>
          </div>
        </div>
        <div class="cpm_btn">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="save">确 定</el-button>
        </div>
      </div>
    </transition>
    <el-dialog title="评论" :visible.sync="comment" width="30%" :before-close="handleClose">
      <div>
        <div style="margin-bottom: 20px;">
          <a href="javascript:;" v-if="!submit" @click="submit = true">添加评论</a>
          <div v-if="submit">
            <a href="javascript:;" @click="submit = false">取消</a>&nbsp;
            <a href="javascript:;">确定</a>
          </div>
          <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="textarea" v-if="submit"></el-input>
        </div>
        <ul class="commentList">
          <li v-for="item in reviewList">
            <img src="./../../../assets/images/u542.jpg" alt="">
            <div class="describe">
              <div>
                <span>{{item.nick_name}}</span>
                <span>{{item.create_time}}</span>
              </div>
              <p class="describe_p">{{item.content}}</p>
              <a href="javascript:;" @click="delReview(item)">删除</a>
            </div>
          </li>
        </ul>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="comment = false">取 消</el-button>
        <el-button type="primary" @click="comment = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import UE from "../../common/ueditor";
export default {
  data() {
    return {
      textarea: "",
      submit: false,
      comment: false,
      config: {
        initialFrameWidth: null,
        initialFrameHeight: 350
      },
      input: "",
      dialogVisible: false,
      value: "",
      options: [],
      currentPage: 1,
      tableData3: [],
      selList: [],
      carLives: {
        imgUrl: ""
      },
      options: [],
      reviewList: []
    };
  },
  components: {
    UE
  },
  methods: {
    //删除评论
    delReview(item) {
      this.$post("admin/article/carlife/delCarLifeComment", {
        comment_id: item.comment_id
      }).then(res => {
        this.$message(res.msg);
        this.review(item.life_id)
      });
    },
    //评论列表
    review(id) {
      this.comment = true;
      this.$post("admin/article/carlife/getCarLifeComment", {
        life_id: id
      }).then(res => {
        this.reviewList = res.data;
        console.log(res);
      });
    },
    //批量删除
    batchDel() {
      this.$post("admin/article/carlife/delCarLife", {
        ids: this.selList
          .map(i => {
            return i.id;
          })
          .join(",")
      }).then(res => {
        if (res.code == 0) {
          this.gitList();
        }
        this.$message(res.msg);
        console.log(res);
      });
    },
    //点击查询
    btn() {
      this.$post("admin/article/carlife/getCarLifeList", {
        keyword: this.input
      }).then(res => {
        console.log(res);
        this.tableData3 = res.data;
        this.$message(res.msg);
        this.carLives = {
          imgUrl: ""
        };
      });
    },
    //选择分类
    classifyChange() {
      this.$post("admin/article/carlife/getCarLifeList", {
        c_id: this.value
      }).then(res => {
        console.log(res);
        this.tableData3 = res.data;
        this.$message(res.msg);
        this.carLives = {
          imgUrl: ""
        };
      });
    },
    //编辑
    edit(item) {
      this.dialogVisible = true;
      console.log(item);
      if (item.image) {
        document.querySelector("#addImg").src = item.image;
      }
      this.$refs.ue.setUEContent(item.content);
      this.carLives = item;
    },
    //上传图片
    imgChange(e) {
      console.log("上传");
      this.tools.uploads(e).then(res => {
        console.log(res);
        if (res) {
          this.carLives.imgUrl = res;
          document.querySelector("#addImg").src = res;
        } else {
          this.$message("上传图片失败");
        }
      });
    },
    //获取车生活分类列表
    carLive() {
      this.$post("admin/article/carlife/getCarLifeCategoryList").then(res => {
        res.data.forEach(i => {
          let json = {
            value: i.c_id,
            label: i.c_name
          };
          this.options.push(json);
        });
      });
    },
    //置顶
    top(num, id) {
      this.$post("admin/article/carlife/carLifeTop", {
        id: id,
        top: num
      }).then(res => {
        if (res.code == 0) {
          this.$message(res.msg);
          this.gitList();
        }
      });
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    handleClose(done) {
      done();
    },
    //上下线
    status() {},
    //保存
    save() {
      this.carLives.content = this.$refs.ue.getUEContent();
      this.carLives.content = this.carLives.content.replace("\\", "");
      console.log(this.carLives);
      this.$post("admin/article/carlife/handleCarLife", this.carLives).then(
        res => {
          if (res.code == 0) {
            this.dialogVisible = false;
            this.gitList();
          }
          this.$message(res.msg);
        }
      );
    },
    // 添加
    add() {},
    handleSelectionChange(val) {
      console.log(val);
      this.selList = val;
    },
    demo(item) {
      console.log(item);
    },
    gitList() {
      this.$post("admin/article/carlife/getCarLifeList").then(res => {
        console.log(res);
        this.tableData3 = res.data;
        this.carLives = {
          imgUrl: ""
        };
      });
    }
  },
  mounted() {
    this.gitList();
    this.carLive();
  }
};
</script>

<style scoped>
.center {
  width: 700px;
}

.commentList img {
  width: 50px;
  float: left;
}

.commentList li {
  margin-bottom: 20px;
  margin-top: 10px;
}

.describe {
  margin-left: 60px;
}

.describe_p {
  margin: 5px 0;
}
</style>
