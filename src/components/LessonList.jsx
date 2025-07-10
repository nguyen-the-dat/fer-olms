import { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { Grip, Pencil, CirclePlay } from "lucide-react";
import { Badge } from "react-bootstrap";
import { GripVertical } from "react-bootstrap-icons";
import { Button } from "react-bootstrap";

export const LessonList = ({ items, onReorder, onEdit }) => {
  const handleDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;

    const reordered = [...items];
    const [removed] = reordered.splice(source.index, 1);
    reordered.splice(destination.index, 0, removed);

    const reorderedWithOrder = reordered.map((mod, index) => ({
      ...mod,
      order: index,
    }));

    onReorder(reorderedWithOrder);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="module-list">
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {items.map((mod, index) => (
              <Draggable
                key={String(mod.id)} // ✅ Sửa từ module.id → mod.id
                draggableId={String(mod.id)} // ✅ Sửa từ module.id → mod.id
                index={index}
              >
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    className="d-flex align-items-center border rounded mb-3 px-2 py-2"
                  >
                    {/* Drag handle */}
                    <div
                      {...provided.dragHandleProps}
                      className={`me-3 pe-2 border-end ${
                        mod.active ? "border-success" : "border-secondary"
                      }`}
                      style={{ cursor: "grab" }}
                    >
                      <Grip size={20} />
                    </div>

                    {/* Title and icon */}
                    <div className="d-flex align-items-center gap-2">
                      <CirclePlay size={18} />
                      <span>{mod.title}</span>
                    </div>

                    {/* Right side: status and edit */}
                    <div className="ms-auto d-flex align-items-center gap-2">
                      <Badge bg={mod.active ? "success" : "secondary"}>
                        {mod.active ? "Published" : "Draft"}
                      </Badge>
                      <Pencil
                        size={18}
                        style={{ cursor: "pointer", opacity: 0.8 }}
                        onClick={() => onEdit(mod.id)}
                        onMouseOver={(e) => (e.currentTarget.style.opacity = 1)}
                        onMouseOut={(e) =>
                          (e.currentTarget.style.opacity = 0.8)
                        }
                      />
                    </div>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

//  const [isMounted, setIsMounted] = useState(false);
//   const [modules, setModules] = useState(items);

//   // Chờ đến khi component được mount để tránh lỗi SSR (nếu có)
//   useEffect(() => {
//     setIsMounted(true);
//   }, []);

//   // Cập nhật lại modules khi props.items thay đổi
//   useEffect(() => {
//     setModules(items);
//   }, [items]);

//   const onDragEnd = (result) => {
//     if (!result.destination) return;

//     const itemsCopy = Array.from(modules);
//     const [reorderedItem] = itemsCopy.splice(result.source.index, 1);
//     itemsCopy.splice(result.destination.index, 0, reorderedItem);

//     const startIndex = Math.min(result.source.index, result.destination.index);
//     const endIndex = Math.max(result.source.index, result.destination.index);
//     const updatedModules = itemsCopy.slice(startIndex, endIndex + 1);

//     setModules(itemsCopy);

//     const bulkUpdateData = updatedModules.map((module) => ({
//       id: module.id,
//       position: itemsCopy.findIndex((item) => item.id === module.id),
//     }));

//     onReorder(bulkUpdateData);
//   };

//   // Nếu chưa mount thì không render để tránh lỗi
//   if (!isMounted) return null;

//   return (
//     <DragDropContext onDragEnd={onDragEnd}>
//       <Droppable droppableId="modules">
//         {(provided) => (
//           <div {...provided.droppableProps} ref={provided.innerRef}>
//             {modules.map((module, index) => (
//               <Draggable
//                 key={String(module.id)} // ✅ fix: dùng String() đảm bảo là chuỗi
//                 draggableId={String(module.id)} // ✅ fix: phải là chuỗi
//                 index={index}
//               >
//                 {(provided) => (
//                   <div
//                     ref={provided.innerRef}
//                     {...provided.draggableProps}
//                     className="d-flex align-items-center border rounded mb-3 px-2 py-2"
//                   >
//                     {/* Drag handle */}
//                     <div
//                       {...provided.dragHandleProps}
//                       className={`me-3 pe-2 border-end ${
//                         module.active ? "border-success" : "border-secondary"
//                       }`}
//                       style={{ cursor: "grab" }}
//                     >
//                       <Grip size={20} />
//                     </div>

//                     {/* Title and icon */}
//                     <div className="d-flex align-items-center gap-2">
//                       <CirclePlay size={18} />
//                       <span>{module.title}</span>
//                     </div>

//                     {/* Right side: status and edit */}
//                     <div className="ms-auto d-flex align-items-center gap-2">
//                       <Badge bg={module.active ? "success" : "secondary"}>
//                         {module.active ? "Published" : "Draft"}
//                       </Badge>
//                       <Pencil
//                         size={18}
//                         style={{ cursor: "pointer", opacity: 0.8 }}
//                         onClick={() => onEdit(module.id)}
//                         onMouseOver={(e) => (e.currentTarget.style.opacity = 1)}
//                         onMouseOut={(e) =>
//                           (e.currentTarget.style.opacity = 0.8)
//                         }
//                       />
//                     </div>
//                   </div>
//                 )}
//               </Draggable>
//             ))}
//             {provided.placeholder}
//           </div>
//         )}
//       </Droppable>
//     </DragDropContext>
//   );
