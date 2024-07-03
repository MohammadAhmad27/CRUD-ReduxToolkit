import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Create action
export const createUser = createAsyncThunk("createUser", async (data, { rejectWithValue }) => {
    const response = await fetch("https://6682ef6c4102471fa4c8b36d.mockapi.io/crud", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    try {
        const result = await response.json();
        return result;
    } catch (error) {
        return rejectWithValue(error.response);
    }
});


// Read action
export const showUser = createAsyncThunk("showUser", async (data, { rejectWithValue }) => {
    const response = await fetch("https://6682ef6c4102471fa4c8b36d.mockapi.io/crud");

    try {
        const result = await response.json();
        return result;
    } catch (error) {
        return rejectWithValue(error.response);
    }
});


// Delete action
export const deleteUser = createAsyncThunk("deleteUser", async (id, { rejectWithValue }) => {
    const response = await fetch(`https://6682ef6c4102471fa4c8b36d.mockapi.io/crud/${id}`, { method: "DELETE" });

    try {
        const result = await response.json();
        return result;
    } catch (error) {
        return rejectWithValue(error.response);
    }
});


// Update action
export const updateUser = createAsyncThunk("updateUser", async (data, { rejectWithValue }) => {
    const response = await fetch(`https://6682ef6c4102471fa4c8b36d.mockapi.io/crud/${data.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    try {
        const result = await response.json();
        return result;
    } catch (error) {
        return rejectWithValue(error.response);
    }
});

export const userDetail = createSlice({
    name: "userDetail",
    initialState: {
        users: [],
        loading: false,
        error: null,
        searchData: "",
    },
    reducers: {
        searchUser: (state, action) => {
            state.searchData = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(createUser.fulfilled, (state, action) => {
                state.loading = false;
                state.users.push(action.payload);
            })
            .addCase(createUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
            })
            .addCase(showUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(showUser.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload;
            })
            .addCase(showUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
            })
            .addCase(deleteUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.loading = false;
                state.users = state.users.filter((user) => user.id !== action.payload.id);
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
            })
            .addCase(updateUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.loading = false;
                state.users = state.users.map((ele) => (ele.id === action.payload.id ? action.payload : ele));
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
            });
    },
});

export default userDetail.reducer;
export const { searchUser } = userDetail.actions;
