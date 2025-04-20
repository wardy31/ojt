import { useEffect, useState } from "react";
import axios from "../../config/axios";
import { Card, CardHeader } from "@/components/ui/card";
import { Folder } from "lucide-react";

function DashboardPage() {
  const [data, setData] = useState([]);

  useEffect(() => {
    (async () => {
      const { data: folderData } = await axios.get("folders?isParent=true");
      console.log(folderData);
      setData(folderData);
    })();
  }, []);
  return (
    <div>
      <div className="my-6">
        <h2 className="uppercase text-2xl">Dashboard</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {data.map((m) => (
            <Card key={m.id}>
              <CardHeader>
                <div className="flex gap-x-2 items-center">
                  <Folder color="blue" />
                  <span className="font-bold">{m.name}</span>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
