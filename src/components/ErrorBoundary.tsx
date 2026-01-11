import { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error('ErrorBoundary caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          background: '#1a1a1a',
          color: 'white',
          padding: '30px',
          borderRadius: '10px',
          border: '2px solid #ef4444',
          maxWidth: '600px',
          fontFamily: 'monospace'
        }}>
          <h2 style={{ color: '#ef4444', marginBottom: '15px' }}>❌ Rendering Error</h2>
          <p style={{ marginBottom: '10px' }}>Something went wrong:</p>
          <pre style={{
            background: '#0a0a0a',
            padding: '15px',
            borderRadius: '5px',
            overflow: 'auto',
            maxHeight: '300px'
          }}>
            {this.state.error?.toString()}
            {'\n\n'}
            {this.state.error?.stack}
          </pre>
          <button
            onClick={() => window.location.reload()}
            style={{
              marginTop: '15px',
              padding: '10px 20px',
              background: '#60a5fa',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
