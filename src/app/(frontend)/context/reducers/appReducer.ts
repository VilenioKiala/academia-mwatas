export function AppReducer(action: { type: string }) {
  switch (action.type) {
    case "startLoading": {
      return {
        loading: true,
      };
    }
    case "stopLoading": {
      return {
        loading: false,
      };
    }
  }
}
