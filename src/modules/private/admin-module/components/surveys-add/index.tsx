// AdminVotingTemplate.js
import { Button, TextInput, Select, Label, Textarea } from "flowbite-react";
import { useState } from "react";
import { useCreateSurvey } from "../hooks/useCreateSurvey";
import {
  NotificationTypes,
  useNotification,
} from "../../../../../hooks/useNotification";
import { Spinner } from "../../../../../components/ui-kit";

const SurveysAdd = () => {
  const [voteName, setVoteName] = useState("");
  const [startTime, setStartTime] = useState(
    new Date().toISOString().slice(0, 16)
  );
  const [endTime, setEndTime] = useState(new Date().toISOString().slice(0, 16));
  const [description, setDescription] = useState("");
  const [scale, setScale] = useState("1-5");

  const { createSurvey, loading } = useCreateSurvey();
  const { showNotification } = useNotification();

  const handleSubmit = async () => {
    const res = await createSurvey({
      title: voteName,
      startAt: startTime,
      finishesAt: endTime,
      body: description,
    });

    if (!res)
      showNotification("Failed to create a survey", NotificationTypes.DANGER);
    else
      showNotification(
        "Survey successfully created",
        NotificationTypes.SUCCESS
      );
  };

  return (
    <div className="flex flex-col gap-4 p-4 border border-gray-200 rounded-lg">
      <TextInput
        placeholder="Nazwa głosowania"
        value={voteName}
        onChange={(e) => setVoteName(e.target.value)}
      />

      <Label>Od:</Label>
      <TextInput
        type="datetime-local"
        value={startTime}
        min={new Date().toISOString().slice(0, 16)}
        onChange={(e) => setStartTime(e.target.value)}
      />

      <Label>Do:</Label>
      <TextInput
        type="datetime-local"
        value={endTime}
        min={startTime}
        onChange={(e) => setEndTime(e.target.value)}
      />

      <Textarea
        placeholder="Opis głosowania"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <Label>Wybierz skalę:</Label>
      <Select value={scale} onChange={(e) => setScale(e.target.value)}>
        <option value="1-5">Od 1 do 5</option>
        <option value="0-10">Od 0 do 10</option>
        <option value="0-5">Od 0 do 5</option>
      </Select>

      <Button onClick={handleSubmit}>Wyślij {loading && <Spinner />}</Button>
      <Button color="gray">Pobierz raport</Button>
    </div>
  );
};

export default SurveysAdd;
