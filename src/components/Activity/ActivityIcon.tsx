"use client";

import { ActivityTransportType, ActivityType } from "@app/models";
import {
  FaBicycle,
  FaBinoculars,
  FaBus,
  FaCar,
  FaHotel,
  FaPlane,
  FaShip,
  FaTools,
  FaTrain,
  FaUtensils,
  FaWalking
} from 'react-icons/fa';

interface Props {
  size?: number;
  type: ActivityType;
  subType?: ActivityTransportType;
  color?: string;
}

export function ActivityIcon(props: Props) {

  const getSubTypeIcon = () => {
    switch (props.subType) {
      case ActivityTransportType.Flight:
        return <FaPlane size={props.size ?? 32} color={props.color ?? ""}/>;
      case ActivityTransportType.Bus:
        return <FaBus size={props.size ?? 32} color={props.color ?? ""}/>;
      case ActivityTransportType.Car:
        return <FaCar size={props.size ?? 32} color={props.color ?? ""}/>;
      case ActivityTransportType.Train:
        return <FaTrain size={props.size ?? 32} color={props.color ?? ""}/>;
      case ActivityTransportType.Boat:
        return <FaShip size={props.size ?? 32} color={props.color ?? ""}/>;
      case ActivityTransportType.Others:
        return <FaBicycle size={props.size ?? 32} color={props.color ?? ""}/>;
      case ActivityTransportType.Transfer:
        return <FaWalking size={props.size ?? 32} color={props.color ?? ""}/>;
      default:
        return <FaWalking size={props.size ?? 32} color={props.color ?? ""}/>;
    }
  }

  const getTypeIcon = () => {
    switch (props.type) {
      case ActivityType.Transport:
        return getSubTypeIcon();
      case ActivityType.Accommodation:
        return <FaHotel size={props.size ?? 32} color={props.color ?? ""}/>;
      case ActivityType.Food:
        return <FaUtensils size={props.size ?? 32} color={props.color ?? ""}/>;
      case ActivityType.Tour:
        return <FaBinoculars size={props.size ?? 32} color={props.color ?? ""}/>;
      default:
        return <FaTools size={props.size ?? 32} color={props.color ?? ""}/>;
    }
  }

  // Renderizando o ícone baseado no tipo de atividade
  return (
    <span>{getTypeIcon()}</span>
  );
}
