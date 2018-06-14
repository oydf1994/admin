<template>
  <div>
    <div>
      <el-button size="small" type="primary" icon="el-icon-plus" @click="dialogVisible = true">添加</el-button>
      <el-button size="small" type="primary" icon="el-icon-close">批量删除</el-button>
      <span>分类:</span>
      <el-select v-model="value" placeholder="请选择" size="small">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
      <span>关键字:</span>
      <el-input v-model="input" placeholder="请输入内容" size="small"></el-input>
      <el-button size="small" type="primary">查询</el-button>
    </div>
    <el-table ref="multipleTable" :data="tableData3" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column label="标题" width="120">
        <template slot-scope="scope">{{ scope.row.date }}</template>
      </el-table-column>
      <el-table-column prop="name" label="所属分类" width="120">
      </el-table-column>
      <el-table-column label="浏览量" show-overflow-tooltip>
        <template slot-scope="scope">
          <a href="#">{{scope.row.address}}</a>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="评论量" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="address" label="点赞量" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="address" label="状态" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="address" label="发布日期" show-overflow-tooltip>
      </el-table-column>
      <el-table-column label="操作" show-overflow-tooltip>
        <template slot-scope="scope">
          <el-button type="text" size="small">置顶</el-button>
          <el-button type="text" size="small">编辑</el-button>
          <el-button type="text" size="small">删除</el-button>
          <el-button type="text" size="small" @click="comment = true">评论</el-button>
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
            <span>分类:</span>
            <el-select v-model="value" placeholder="请选择" size="small">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div class="cpm_line">
            <span>标题:</span>
            <el-input v-model="input" placeholder="请输入内容" size="small"></el-input>
          </div>
          <div class="cpm_line">
            <span>副标题:</span>
            <el-input v-model="input" placeholder="请输入内容" size="small"></el-input>
          </div>
          <div class="cpm_line">
            <span>是否评论:</span>
            <el-input v-model="input" placeholder="请输入内容" size="small"></el-input>
          </div>
          <div class="cpm_line">
            <span>是否上线:</span>
            <el-input v-model="input" placeholder="请输入内容" size="small"></el-input>
          </div>
          <div class="cpm_img">
            <span>封面:</span>
            <img src="./../../../assets/images/LOGO.png" alt="">
          </div>
          <div>
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
    <el-dialog title="评论" :visible.sync="comment" width="30%" :before-close="(handleClose)">
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
          <li>
            <img src="./../../../assets/images/u542.jpg" alt="">
            <div class="describe">
              <div>
                <span>无敌美少女</span>
                <span>2018-6-9 18:14</span>
              </div>
              <p class="describe_p">身后有余忘缩手，眼前无路想回头，高峰时不得瑟，低谷时不坠落，不自怨自艾，什么时候都要记住一步一个脚印</p>
              <a href="javascript:;">删除</a>
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
        textarea: '',
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
        tableData3: [{
            date: "2016-05-02",
            name: "1",
            address: "上海市"
          },
          {
            date: "2016-05-04",
            name: "2",
            address: " 1517 弄"
          },
          {
            date: "2016-05-01",
            name: "3",
            address: " 1519 弄"
          },
          {
            date: "2016-05-03",
            name: "4",
            address: " 1516 弄"
          }
        ],
        options: [{
          value: "选项1",
          label: "黄金糕"
        }]
      };
    },
    components: {
      UE
    },
    methods: {
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
      handleClose() {},
      //保存
      save() {
        console.log(this.$refs.ue.getUEContent());
      },
      // 添加
      add() {},
      handleSelectionChange(val) {
        console.log(val);
      },
      demo(item) {
        console.log(item);
      }
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

  commentList li {
    margin-bottom: 20px;
  }

  .describe {
    margin-left: 60px;
  }

  .describe_p {
    margin: 5px 0;
  }

</style>
