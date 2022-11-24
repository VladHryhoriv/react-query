import React, { ReactElement } from 'react';
import { Button } from 'components/Button';

type ErrorState = {
  hasError: boolean;
};

type Props = { children: ReactElement } & Record<string, unknown>;

export class ErrorBoundary extends React.Component<Props, ErrorState> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorState {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: any): void {
    // You can also log the error to an error reporting service
    // logErrorToMyService(error, errorInfo)
    console.error(errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className='error'>
          <h1>Something went wrong</h1>
          <Button onClick={() => window.location.reload()}>Reload</Button>
        </div>
      );
    }

    return this.props.children;
  }
}
