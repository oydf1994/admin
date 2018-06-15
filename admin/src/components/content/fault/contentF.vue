<template>
  <div>
    <div>
      <el-button size="small" type="primary" icon="el-icon-plus" @click="dialogVisible = true">新增</el-button>
      <el-button size="small" type="primary" icon="el-icon-close" @click="dialogVisible = true">批量删除</el-button>
      <span>关键字:</span>
      <el-input v-model="input" placeholder="请输入内容" size="small"></el-input>
      <el-button size="small" type="primary">查询</el-button>
    </div>
    <!-- <el-table :data="tableData3" style="width: 100%">
      <el-table-column prop="date" label="分类" width="180">
      </el-table-column>
       <el-table-column prop="date" label="分类" width="180" >
      </el-table-column>
      <el-table-column prop="name" label="发布数量" width="180">
      </el-table-column>
      <el-table-column prop="address" label="排序">
      </el-table-column>
      <el-table-column prop="address" label="状态">
        <template slot-scope="scope">
          <a href="javascript:;">启用</a>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small">编辑</el-button>
          <el-button type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="备注">
      </el-table-column>
    </el-table> -->
    <table class="table">
      <tr>
        <th>
          <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">&nbsp;</el-checkbox>
        </th>
        <th>服务项目</th>
        <th>状态</th>
        <th>操作</th>
        <th>备注</th>
      </tr>
      <tbody v-for="item in tableData3">
        <tr>
          <td>
            <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
              <el-checkbox :label="item" :key="item.name">&nbsp;</el-checkbox>
            </el-checkbox-group>
          </td>
          <td @click="item.flag = !item.flag ">{{item.date}}
            <i :class="item.flag?'el-icon-arrow-right icon rotate':'el-icon-arrow-right icon'"></i>
          </td>
          <td>{{item.name}}</td>
          <td>{{item.address}}</td>
          <td>{{item.address}}</td>
        </tr>
        <tr v-if="item.flag"> 
          <td>
            <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
              <el-checkbox :label="item" :key="item.name">&nbsp;</el-checkbox>
            </el-checkbox-group>
          </td>
          <td>{{item.cha.a}}</td>
          <td>
            <a href="javascript:;">上线</a>
          </td>
          <td>
            <a href="javascript:;" @click="dialogVisible2 = true">查看故障</a>
            <a href="javascript:;">编辑</a>
            <a href="javascript:;">删除</a>
          </td>
          <td>{{item.address}}</td>
        </tr>
      </tbody>
    </table>
    <el-dialog title="新增故障" :visible.sync="dialogVisible" width="35%" :before-close="handleClose">
      <div class="dialog">
        <div class="cpm_line">
          <span class="span">
            故障分类:
          </span>
          <el-select v-model="value" placeholder="请选择" size="small">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="cpm_line">
          <span class="span">
            故障名称:
          </span>
          <el-input v-model="input" placeholder="请输入内容" size="small"></el-input>
        </div>
        <div class="cpm_line">
          <span class="span">
            状态:
          </span>
          <el-radio-group v-model="radio2">
            <el-radio label='1'>上线</el-radio>
            <el-radio label='2'>隐藏</el-radio>
          </el-radio-group>
        </div>
        <div class="cpm_line">
          <span class="span">故障原因</span>
          <el-input type="textarea" v-model="textarea" style="width:510px"></el-input>
        </div>
        <div class="cpm_line">
          <span class="span">排除方法</span>
          <el-input type="textarea" v-model="textarea" style="width:510px"></el-input>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="查看故障" :visible.sync="dialogVisible2" width="30%" :before-close="handleClose">
      <div>
        <h5>故障</h5>
        <p>手动变速器换挡困难</p>
        <h5>故障原因</h5>
        <p>1.离合器自由行程过大，踩下踏板膜片弹簧不能充分压缩</p>
        <h5>排除步骤</h5>
        <p>1.离合器自由行程过大，踩下踏板膜片弹簧不能充分压缩</p>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        dialogVisible2: false,
        value: "",
        radio2: '1',
        checkAll: false,
        checkedCities: [],
        isIndeterminate: true,
        textarea: "",
        dialogVisible: false,
        input: "",
        tableData3: [{
            date: "2016-05-02",
            name: "王小虎111",
            address: "上海市普陀区金沙江路 1518 弄",
            flag: false,
            cha: {
              a: 10
            }
          },
          {
            date: "2016-05-04",
            flag: false,
            name: "王小虎",
            address: "上海市普陀区金沙江路 1517 弄",
            cha: {
              a: 10
            }
          },
          {
            date: "2016-05-01",
            flag: false,
            name: "王小虎",
            address: "上海市普陀区金沙江路 1519 弄",
            cha: {
              a: 10
            }
          },
          {
            date: "2016-05-03",
            name: "王小虎",
            address: "上海市普陀区金沙江路 1516 弄",
            cha: {
              a: 10
            }
          }
        ],
        options: [{
          value: "选项1",
          label: "黄金糕"
        }]
      };
    },
    methods: {
      handleCheckAllChange(val) {
        this.checkedCities = val ? this.tableData3 : [];
        this.isIndeterminate = false;
      },
      handleCheckedCitiesChange(value) {
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.tableData3.length;
        this.isIndeterminate =
          checkedCount > 0 && checkedCount < this.tableData3.length;
      },
      handleSelectionChange(val) {
        console.log(val);
      },
      handleClose(done) {
        done();
      }
    }
  };

</script>

<style scoped>
  .table th {
    white-space: nowrap;
    overflow: hidden;
    user-select: none;
    background-color: #fff;
    text-align: center;
    border-bottom: 1px solid #ebeef5;
    padding: 12px 10px;
    min-width: 0;
    color: #909399;
    box-sizing: border-box;
    text-overflow: ellipsis;
    vertical-align: middle;
  }

  .table {
    width: 100%;
  }

  .table td {
    border-bottom: 1px solid #ebeef5;
    padding: 12px 10px;
    min-width: 0;
    box-sizing: border-box;
    text-overflow: ellipsis;
    vertical-align: middle;
    text-align: center;
  }

  h5 {
    font-size: 18px;
    margin-bottom: 10px;
    margin-top: 20px;
  }

  .icon {
    transition: all 0.5s;
  }

  .rotate {
    transform: rotate(90deg);
  }

</style>
