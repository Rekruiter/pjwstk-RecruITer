import EmptyLayout from '../components/Layout/EmptyLayout';
import Layout from '../components/Layout/Layout';

export const wrapInLayout = (element: JSX.Element, withoutMargin?: boolean) => {
  return <Layout withoutMargin={withoutMargin}>{element}</Layout>;
};

export const wrapInEmptyLayout = (element: JSX.Element) => {
  return <EmptyLayout>{element}</EmptyLayout>;
};

export const wrapInPanelLayout = (element: JSX.Element, withoutMargin?: boolean) => {
  return (
    <Layout withoutMargin={withoutMargin} panel>
      {element}
    </Layout>
  );
};
