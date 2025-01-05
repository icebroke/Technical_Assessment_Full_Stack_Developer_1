import { Layout, Row, Col } from "antd";
import ItemTable from "./features/items/itemTable";
import { Item } from "./schemes/itemSchema";
import "./App.css";
import ItemForm from "./features/items/itemForm";
import { useState } from "react";

const { Header, Content, Footer } = Layout;

function App() {
  const [editItem, setEditItem] = useState<Item | null>(null);

  const handleResetEditItem = () => {
    setEditItem(null);
  }

  const handleEdit = (item: Item) => {
    if (item) {
      setEditItem(item);
    } else {
      console.error("Selected edit Item is null.");
    }
  };

  return (
    <Layout
      style={{
        borderRadius: 5,
        backgroundColor: "#bcc6cc",
      }}
    >
      <Header
        style={{
          borderStartStartRadius: 5,
          backgroundColor: "#ffffff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h1>CRUD Item</h1>
      </Header>

      <Content style={{ padding: "20px" }}>
        <Row justify="center" style={{ paddingBottom: 20 }}>
          <Col xs={24} sm={20} md={16} lg={12} xl={8}>
            <ItemForm item={editItem} onResetItem={handleResetEditItem} />
          </Col>
        </Row>
        <hr />
        <Row justify="center" style={{ paddingTop: 20 }}>
          <Col span={24}>
            <ItemTable onEdit={handleEdit} />
          </Col>
        </Row>
      </Content>

      <Footer
        style={{
          borderEndEndRadius: 5,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
        <div>&copy; 2025 CRUD Item.</div>
      </Footer>
    </Layout>
  );
}

export default App;
