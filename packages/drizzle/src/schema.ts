import {
	date,
	integer,
	pgEnum,
	pgTable,
	text,
	time,
	timestamp,
	unique,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
	id: integer("id").primaryKey(),

	username: text("username").notNull(),
	name: text("name").notNull(),
	email: text("email").notNull(),

	createdAt: timestamp("created_at").notNull().defaultNow(),
	updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const periods = pgTable("periods", {
	id: integer("id").primaryKey(),

	name: text("name").notNull(),

	start: date("start").notNull(),
	end: date("end").notNull(),

	createdAt: timestamp("created_at").notNull().defaultNow(),
	updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const shiftSchedule = pgTable("shift_schedule", {
	id: integer("id").primaryKey(),

	periodId: integer("period_id")
		.notNull()
		.references(() => periods.id, { onDelete: "cascade" }),

	name: text("name").notNull(),
	location: text("location").notNull(),
	description: text("description"),
	color: text("color"),
	icon: text("icon"),

	dayOfWeek: integer("day_of_week").array().notNull(),
	duration: integer("duration").notNull(),
	startTime: time("start_time").notNull(),
	endTime: time("end_time").notNull(),
	priority: integer("priority").notNull().default(0),

	createdAt: timestamp("created_at").notNull().defaultNow(),
	updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const shiftOccurrences = pgTable(
	"shift_occurrences",
	{
		id: integer("id").primaryKey(),

		shiftScheduleId: integer("shift_schedule_id")
			.notNull()
			.references(() => shiftSchedule.id, { onDelete: "cascade" }),
		timestamp: timestamp("timestamp").notNull(),

		createdAt: timestamp("created_at").notNull().defaultNow(),
		updatedAt: timestamp("updated_at").notNull().defaultNow(),
	},
	(t) => [unique().on(t.shiftScheduleId, t.timestamp)],
);

export const shiftScheduleAssignments = pgTable("shift_schedule_assignments", {
	id: integer("id").primaryKey(),

	shiftScheduleId: integer("shift_schedule_id")
		.notNull()
		.references(() => shiftSchedule.id, { onDelete: "cascade" })
		.unique(),
	userId: integer("user_id")
		.notNull()
		.references(() => users.id, { onDelete: "cascade" }),

	createdAt: timestamp("created_at").notNull().defaultNow(),
	updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const shiftAttendanceStatus = pgEnum("shift_attendance_status", [
	"present",
	"absent",
	"arrived_late",
	"left_early",
]);

export const shiftAttendances = pgTable("shift_attendances", {
	id: integer("id").primaryKey(),

	shiftOccurrenceId: integer("shift_occurrence_id")
		.notNull()
		.references(() => shiftOccurrences.id, { onDelete: "cascade" }),
	userId: integer("user_id")
		.notNull()
		.references(() => users.id, { onDelete: "cascade" }),

	status: shiftAttendanceStatus("status").notNull().default("absent"),

	timeIn: timestamp("time_in"),
	timeOut: timestamp("time_out"),

	createdAt: timestamp("created_at").notNull().defaultNow(),
	updatedAt: timestamp("updated_at").notNull().defaultNow(),
});
