```js
import MaterialTable from 'material-table';
<React.Fragment>
<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>
<MaterialTable 
      title="Welcome Admin"
        columns={[
          { title: 'Name', field: 'name' },
          { title: 'Email', field: 'email'},
          { title: 'Role', field: 'role'},
          { title: 'Password', field: 'pass'}
        ]}
        data    = { [{'name': 'student1', 'email':'student1@e.ntu.edu.sg', 'role': 'ROLE_STUDENT'},
                    {'name': 'teacher1', 'email':'teacher1@e.ntu.edu.sg', 'role': 'ROLE_TEACHER'}]}
        options={{
        }}
        editable={{
          onRowAdd: newData =>
            new Promise((resolve, reject) => {resolve()}),
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {resolve() }),
          onRowDelete: oldData =>
          new Promise((resolve, reject) => { resolve()}),
        }}
      />
</React.Fragment>
```