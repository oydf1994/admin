<template>
  <div>
    <div>
      <el-button size="small" type="primary" icon="el-icon-plus" @click="dialogVisible = true;fault={}">新增</el-button>
      <el-button size="small" type="primary" icon="el-icon-close" @click="batchDel">批量删除</el-button>
      <span>关键字:</span>
      <el-input v-model="input" placeholder="请输入内容" size="small"></el-input>
      <el-button size="small" type="primary" @click="btn">查询</el-button>
    </div>
    <table class="table">
      <tr>
        <th width="50px">
        </th>
        <th width="200px">服务项目</th>
        <th>状态</th>
        <th width="500px">操作</th>
        <th>备注</th>
      </tr>
      <tbody v-for="item in tableData3">
        <tr>
          <td width="50px">
          </td>
          <td @click="item.flag = !item.flag " width="200px">{{item.c_name}}
            <i :class="item.flag?'el-icon-arrow-right icon rotate':'el-icon-arrow-right icon'"></i>
          </td>
          <td></td>
          <td  width="500px"></td>
          <td>{{item.describe}}</td>
        </tr>
        <tr v-show="item.flag" v-for="item1 in item.list">
          <td width="50px">
            <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
              <el-checkbox :label="item1" :key="item1.fault_id">&nbsp;</el-checkbox>
            </el-checkbox-group>
          </td>
          <td width="200px">{{item1.title}}</td>
          <td v-if="item1.status == 1">
            <a href="javascript:;">上线</a>
          </td>
          <td v-if="item1.status == 2" >
            <a href="javascript:;">下线</a>
          </td>
          <td  width="500px">
            <a href="javascript:;" @click="look(item1)">查看故障</a>
            <a href="javascript:;"  @click="edit(item1)">编辑</a>
            <a href="javascript:;" @click="del(item1.fault_id)">删除</a>
          </td>
          <td>{{item.list.title}}</td>
        </tr>
      </tbody>
    </table>
    <el-dialog title="新增故障" :visible.sync="dialogVisible" width="35%" :before-close="handleClose">
      <div class="dialog">
        <div class="cpm_line">
          <span class="span">
            故障分类:
          </span>
          <el-select v-model="fault.c_id" placeholder="请选择" size="small">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="cpm_line">
          <span class="span">
            故障名称:
          </span>
          <el-input v-model="fault.title" placeholder="请输入内容" size="small"></el-input>
        </div>
        <div class="cpm_line">
          <span class="span">
            状态:
          </span>
          <el-radio-group v-model="fault.status">
            <el-radio label='1'>上线</el-radio>
            <el-radio label='2'>隐藏</el-radio>
          </el-radio-group>
        </div>
        <div class="cpm_line">
          <span class="span">故障原因</span>
          <el-input type="textarea" v-model="fault.reason" style="width:510px"></el-input>
        </div>
        <div class="cpm_line">
          <span class="span">排除方法</span>
          <el-input type="textarea" v-model="fault.solve" style="width:510px"></el-input>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="save">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="查看故障" :visible.sync="dialogVisible2" width="30%" :before-close="handleClose">
      <div>
        <h5>故障</h5>
        <p>{{lookFault.title}}</p>
        <h5>故障原因</h5>
        <p>{{lookFault.reason}}</p>
        <h5>排除步骤</h5>
        <p>{{lookFault.solve}}</p>
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
      radio2: "1",
      checkAll: false,
      checkedCities: [],
      isIndeterminate: true,
      textarea: "",
      fault: {},
      dialogVisible: false,
      input: "",
      tableData3: [],
      options: [],
      lookFault: {}
    };
  },
  methods: {
    //编辑
    edit(item) {
      console.log(item.status);
      item.status += "";
      this.dialogVisible = true;
      this.fault = item;
    },
    //查看故障
    look(item) {
      this.dialogVisible2 = true;
      this.lookFault = item;
    },
    //增加,编辑
    save() {
      this.$post("admin/article/fault/handleFault", this.fault).then(res => {
        if (res.code == 0) {
          this.dialogVisible = false;
          this.gitList();
        }
        this.$message(res.msg);
      });
    },
    //关键字查询
    btn() {
      this.$post("admin/article/fault/getFaultList", {
        keyword: this.input
      }).then(res => {
        res.data.forEach(element => {
          element.flag = false;
        });
        this.tableData3 = res.data;
        this.$message('操作成功');
      });
    },
    // 批量删除
    batchDel() {
      console.log(this.checkedCities)
      this.$post("admin/article/fault/delFault", {
        ids: this.checkedCities
          .map(i => {
            return i.fault_id;
          })
          .join(",")
      }).then(res => {
        if (res.code == 0) {
          this.gitList();
        }
        this.$message(res.msg);
      });
    },
    //删除
    del(id) {
      this.$post("admin/article/fault/delFault", { ids: id }).then(res => {
        this.$message(res.msg);
        if (res.code == 0) {
          this.gitList();
        }
      });
    },
    handleCheckedCitiesChange(value) {
    },
    handleSelectionChange(val) {
      console.log(val);
    },
    handleClose(done) {
      done();
    },
    gitList(keyword) {
      this.$post("admin/article/fault/getFaultList").then(res => {
        this.options = [];
        res.data.forEach(element => {
          element.flag = false;
          let json = {
            value: element.c_id,
            label: element.c_name
          };
          this.options.push(json);
        });
        this.tableData3 = res.data;
      });
    }
  },
  mounted() {
    this.gitList();
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
