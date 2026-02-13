"use client";

import { useActionState, useState } from "react";
import NextLink from "@/components/shared/NextLink";
import { EventType } from "@/generated/prisma/enums";
import { ApplicationDetailData } from "@/lib/actions";
import { deleteEvent } from "@/lib/events";
import { eventTypeLabel, interviewTypeLabel } from "@/lib/format";
import CancelIcon from "@mui/icons-material/Cancel";
import CelebrationIcon from "@mui/icons-material/Celebration";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import EditCalendarIcon from "@mui/icons-material/EditCalendar";
import EventIcon from "@mui/icons-material/Event";
import MoveToInboxIcon from "@mui/icons-material/MoveToInbox";
import ReplyIcon from "@mui/icons-material/Reply";
import { Button, Stack, Table, TableBody, TableCell, TableContainer, TableRow } from "@mui/material";
import DeleteConfirmation from "./DeleteConfirmation";

type EventsListProps = {
  applicationId: number;
  events: NonNullable<ApplicationDetailData>["events"];
};

const EventsList = ({ applicationId, events }: EventsListProps) => {
  const [state, dispatch, isPending] = useActionState(deleteEvent, { events, message: null });
  const [confirmIsOpen, setConfirmIsOpen] = useState(false);
  const [confirmForm, setConfirmForm] = useState<HTMLFormElement | null>(null);

  const handleDeleteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setConfirmIsOpen(true);
    setConfirmForm((e.currentTarget.parentElement as HTMLFormElement) || null);
  };

  const handleClose = () => {
    setConfirmIsOpen(false);
  };

  const handleConfirm = () => {
    setConfirmIsOpen(false);
    confirmForm?.requestSubmit();
  };

  return (
    <>
      <TableContainer>
        <Table sx={{ border: 1, borderColor: "divider", opacity: isPending ? "0.33" : "1" }}>
          <TableBody>
            {state.events.map((event) => (
              <TableRow key={`${event.type}-${event.createdAt}`}>
                <TableCell>
                  {event.type === EventType.APPLICATION && <MoveToInboxIcon color="primary" />}
                  {event.type === EventType.INTERVIEW && <EventIcon color="primary" />}
                  {event.type === EventType.SCHEDULE_REQUEST && <EditCalendarIcon color="secondary" />}
                  {event.type === EventType.FOLLOW_UP && <ReplyIcon color="secondary" />}
                  {event.type === EventType.FOLLOW_UP_SELF && <ReplyIcon color="primary" />}
                  {event.type === EventType.OFFER && <CelebrationIcon color="secondary" />}
                  {event.type === EventType.REJECTION && <CancelIcon color="secondary" />}
                  {event.type === EventType.AUTO_REJECTION && <CancelIcon color="secondary" />}
                  {event.type === EventType.WITHDRAWAL && <CancelIcon color="primary" />}
                </TableCell>
                <TableCell>{event.createdAt.toDateString()}</TableCell>
                <TableCell>{eventTypeLabel(event.type)}</TableCell>
                <TableCell>{!!event.interviewType && interviewTypeLabel(event.interviewType)}</TableCell>
                <TableCell>{event.notes}</TableCell>
                <TableCell>
                  <Stack direction="row" justifyContent="flex-end" spacing={1}>
                    <Button
                      component={NextLink}
                      href={`/application/${applicationId}/event/edit/${event.id}`}
                      variant="outlined"
                      color="secondary"
                      size="small"
                      startIcon={<EditIcon />}
                      sx={{ whiteSpace: "nowrap" }}
                    >
                      Edit
                    </Button>
                    <form action={dispatch}>
                      <input type="hidden" name="id" value={event.id} />
                      <Button
                        variant="outlined"
                        color="secondary"
                        size="small"
                        type="submit"
                        startIcon={<DeleteIcon />}
                        sx={{ whiteSpace: "nowrap" }}
                        onClick={handleDeleteClick}
                      >
                        Delete
                      </Button>
                    </form>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <DeleteConfirmation open={confirmIsOpen} onClose={handleClose} onConfirm={handleConfirm} />
    </>
  );
};

export default EventsList;
