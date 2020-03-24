```js
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

<Container component="main" maxWidth="xs">
      <CssBaseline />
      <div >
        <form noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <FormControl >
        <InputLabel id="demo-simple-select-autowidth-label">Role</InputLabel>
        <Select
          labelId="select-label"
          id="select"
          name = "role"
          autoWidth
        >
          <MenuItem value={"ROLE_STUDENT"}>Student</MenuItem>
          <MenuItem value={"ROLE_TEACHER"}>Teacher</MenuItem>
          <MenuItem value={"ROLE_ADMIN"}>Admin</MenuItem>
        </Select>
      </FormControl>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
          >
            Login
          </Button>
        </form>
      </div>
    </Container>
```