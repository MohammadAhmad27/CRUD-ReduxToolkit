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
            
    },
});

export default userDetail.reducer;
export const { searchUser } = userDetail.actions;
