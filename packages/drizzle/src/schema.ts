import {
	boolean,
	integer,
	pgEnum,
	pgTable,
	text,
	time,
	timestamp,
	unique,
} from "drizzle-orm/pg-core";

export const userRole = pgEnum("user_role", ["admin", "user", "guest"]);

export const users = pgTable("users", {
	id: integer("id").primaryKey().generatedByDefaultAsIdentity(),

	username: text("username").notNull(),
	name: text("name").notNull(),
	email: text("email").notNull(),

	role: userRole("role").notNull().default("guest"),

	createdAt: timestamp("created_at").notNull().defaultNow(),
	updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const userTags = pgTable(
	"user_tags",
	{
		id: integer("id").primaryKey().generatedByDefaultAsIdentity(),

		userId: integer("user_id")
			.notNull()
			.references(() => users.id, { onDelete: "cascade" }),
		tag: text("tag").notNull(),

		createdAt: timestamp("created_at").notNull().defaultNow(),
		updatedAt: timestamp("updated_at").notNull().defaultNow(),
	},
	(t) => [unique().on(t.userId, t.tag)],
);

export const tag = pgTable("tags", {
	id: integer("id").primaryKey().generatedByDefaultAsIdentity(),

	name: text("name").notNull().unique(),

	createdAt: timestamp("created_at").notNull().defaultNow(),
	updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const periods = pgTable("periods", {
	id: integer("id").primaryKey().generatedByDefaultAsIdentity(),

	name: text("name").notNull(),

	start: timestamp("start").notNull(),
	end: timestamp("end").notNull(),

	// Date range of when the period is visible to users
	visibleStart: timestamp("visible_start"),
	visibleEnd: timestamp("visible_end"),

	// Date range of when users can sign up for shifts
	scheduleSignupStart: timestamp("schedule_signup_start"),
	scheduleSignupEnd: timestamp("schedule_signup_end"),

	// Date range of when users can modify (drop/trade) assigned shifts
	scheduleModifyStart: timestamp("schedule_modify_start"),
	scheduleModifyEnd: timestamp("schedule_modify_end"),

	createdAt: timestamp("created_at").notNull().defaultNow(),
	updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const shiftSchedule = pgTable("shift_schedule", {
	id: integer("id").primaryKey().generatedByDefaultAsIdentity(),

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
	slots: integer("slots").notNull().default(1),

	isBalancedAcrossOverlap: boolean("is_balanced_across_overlap")
		.notNull()
		.default(false),
	isBalancedAcrossDay: boolean("is_balanced_across_day")
		.notNull()
		.default(false),
	isBalancedAcrossPeriod: boolean("is_balanced_across_period")
		.notNull()
		.default(false),
	canSelfAssign: boolean("allow_self_assign").notNull().default(true),

	doRequireTags: boolean("do_require_tags").notNull().default(false),
	requiredTags: text("required_tags").array().notNull().default([]),

	createdAt: timestamp("created_at").notNull().defaultNow(),
	updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const shiftOccurrences = pgTable(
	"shift_occurrences",
	{
		id: integer("id").primaryKey().generatedByDefaultAsIdentity(),

		shiftScheduleId: integer("shift_schedule_id")
			.notNull()
			.references(() => shiftSchedule.id, { onDelete: "cascade" }),
		timestamp: timestamp("timestamp").notNull(),

		createdAt: timestamp("created_at").notNull().defaultNow(),
		updatedAt: timestamp("updated_at").notNull().defaultNow(),
	},
	(t) => [unique().on(t.shiftScheduleId, t.timestamp)],
);

export const shiftScheduleAssignments = pgTable(
	"shift_schedule_assignments",
	{
		id: integer("id").primaryKey().generatedByDefaultAsIdentity(),

		shiftScheduleId: integer("shift_schedule_id")
			.notNull()
			.references(() => shiftSchedule.id, { onDelete: "cascade" }),
		userId: integer("user_id")
			.notNull()
			.references(() => users.id, { onDelete: "cascade" }),

		createdAt: timestamp("created_at").notNull().defaultNow(),
		updatedAt: timestamp("updated_at").notNull().defaultNow(),
	},
	(t) => [unique().on(t.shiftScheduleId, t.userId)],
);

export const shiftOccurrenceAssignmentsStatus = pgEnum(
	"shift_occurrence_assignment_status",
	["assigned", "dropped", "picked_up"],
);

export const shiftOccurrenceAssignments = pgTable(
	"shift_occurrence_assignments",
	{
		id: integer("id").primaryKey().generatedByDefaultAsIdentity(),

		shiftOccurrenceId: integer("shift_occurrence_id")
			.notNull()
			.references(() => shiftOccurrences.id, { onDelete: "cascade" }),
		userId: integer("user_id")
			.notNull()
			.references(() => users.id, { onDelete: "cascade" }),

		// assigned, dropped, picked_up, traded
		status: shiftOccurrenceAssignmentsStatus("status")
			.notNull()
			.default("assigned"),

		createdAt: timestamp("created_at").notNull().defaultNow(),
		updatedAt: timestamp("updated_at").notNull().defaultNow(),
	},
	(t) => [unique().on(t.shiftOccurrenceId, t.userId)],
);

export const shiftAttendanceStatus = pgEnum("shift_attendance_status", [
	"present",
	"absent",
	"arrived_late",
	"left_early",
]);

export const shiftAttendances = pgTable("shift_attendances", {
	id: integer("id").primaryKey().generatedByDefaultAsIdentity(),

	occurrenceAssignmentId: integer("occurrence_assignment_id")
		.notNull()
		.references(() => shiftOccurrenceAssignments.id, { onDelete: "cascade" }),

	status: shiftAttendanceStatus("status").notNull().default("absent"),

	timeIn: timestamp("time_in"),
	timeOut: timestamp("time_out"),

	createdAt: timestamp("created_at").notNull().defaultNow(),
	updatedAt: timestamp("updated_at").notNull().defaultNow(),
});
