"use client";

import { Activity, ActivityType } from "@app/models";
import { ScheduleContentTransport } from "./ScheduleContent/ScheduleContentTransport";

interface Props {
  activity: Activity;
  day: Date;
  time: string;
}

export function ActivityScheduleDetail(props: Props) {
  // Get class name by activity type
  const getActivityBG = () => {
    switch (props.activity.type) {
      case ActivityType.Transport:
        return "bg-activity-transport";  // Azul para Transporte
      case ActivityType.Accommodation:
        return "bg-activity-accommodation";  // Cinza para Hospedagem
      case ActivityType.Food:
        return "bg-activity-food";  // Verde para Alimentação
      case ActivityType.Tour:
        return "bg-activity-tour";  // Azul Escuro para Passeio
      case ActivityType.Others:
        return "bg-activity-others";  // Cinza Escuro para Diversos
      default:
        return "bg-grey-light";  // Cor padrão
    }
  }

  // Get text by activity type
  const getActivityText = ({ className }: { className?: string }) => {
    switch (props.activity.type) {
      case ActivityType.Transport:
        return <ScheduleContentTransport className={className} activity={props.activity} day={props.day} time={props.time} />
      case ActivityType.Accommodation:
        return <span className="ml-2 text-sm font-semibold">{props.activity.type}</span>;
      case ActivityType.Food:
        return <span className="ml-2 text-sm font-semibold">{props.activity.type}</span>;
      case ActivityType.Tour:
        return <span className="ml-2 text-sm font-semibold">{props.activity.type}</span>;
      case ActivityType.Others:
        return <span className="ml-2 text-sm font-semibold">{props.activity.type}</span>;
      default:
        return <span className="ml-2 text-sm font-semibold">{props.activity.type}</span>;
    }
  }

  // States
  return (
    <span className={`flex items-center w-full h-full justify-center text-white ${getActivityBG()}`}>
      {getActivityText({ className: "ml-2 text-sm font-semibold" })}
    </span>
  )
}
