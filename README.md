# eggjs+mysql+sequelize的RBAC权限系统

## 接口规范
| 接口 | 名称 | 方法 |
| ---- | ---- | ---- |
| /api/page  | 分页查询 | post |
| /api/list  | 全部数据查询 | post |
| /api/add  | 添加 | post |
| /api/update  | 修改 | post |
| /api/delete  | 删除 | post |
| /api/info  | 查看详情 | get |

- 接口对应当前页面的权限，也可以自定义权限