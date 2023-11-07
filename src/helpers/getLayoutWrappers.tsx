import Layout from '../components/Layout/Layout';

export const wrapInLayout = (element: JSX.Element, withoutMargin?: boolean) => {
  return <Layout withoutMargin={withoutMargin}>{element}</Layout>;
};

export const wrapInPanelLayout = (element: JSX.Element, withoutMargin?: boolean) => {
  return (
    <Layout withoutMargin={withoutMargin} panel>
      {element}
    </Layout>
  );
};
